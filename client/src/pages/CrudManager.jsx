import React, { useEffect, useState } from 'react';
import { 
  Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight, 
  RotateCw, Filter, AlertCircle, Check, X, Database, Link2
} from 'lucide-react';
import { api } from '../services/api.js';

export function CrudManager() {
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('framework');
  const [data, setData] = useState({ rows: [], total: 0, page: 1, limit: 10, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState(null);
  const [lookups, setLookups] = useState({});

  // Modal states
  const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | 'delete'
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Entity metadata
  const currentEntityMeta = entities.find(e => e.name.toLowerCase() === selectedEntity.toLowerCase());

  // Friendly names for entities
  const friendlyNames = {
    framework: 'Frameworks de Grafos',
    algoritmo: 'Algoritmos',
    dataset: 'Datasets de Grafos',
    ambiente_de_execucao: 'Ambientes de Execução',
    benchmark: 'Resultados de Benchmark',
    pessoa: 'Pessoas / Autores',
    instituicao: 'Instituições',
    artigo: 'Artigos Científicos',
    pesquisador: 'Pesquisadores',
    veiculo: 'Veículos de Publicação',
    aplicacao: 'Aplicações no Mercado',
    complexidade: 'Classes de Complexidade',
    estrutura_de_dados: 'Estruturas de Dados',
    tecnica_de_otimizacao: 'Técnicas de Otimização',
    implementacao: 'Implementações (Framework x Algoritmo)',
    publicacao: 'Publicações',
    avaliacao_artigo: 'Avaliações em Artigos',
    avaliacao_dataset: 'Avaliações em Datasets',
    aplicacao_tecnica_otimizacao: 'Aplicação de Técnicas',
    implementacao_estrutura_dados: 'Estruturas por Implementação',
    implementacao_aplicacao: 'Aplicações por Implementação',
    utilizacao_aplicacao: 'Usuários de Aplicações',
    aplicacao_aplicacao: 'Dependências entre Aplicações',
    artigo_artigo: 'Citações entre Artigos',
  };

  function getForeignKeyLookupKey(colName) {
    const map = {
      instituicao_id: 'instituicao',
      pessoa_id: 'pessoa',
      framework_id: 'framework',
      algoritmo_id: 'algoritmo',
      dataset_id: 'dataset',
      ambiente_id: 'ambiente_de_execucao',
      artigo_id: 'artigo',
      artigo_citando_id: 'artigo',
      artigo_citado_id: 'artigo',
      veiculo_id: 'veiculo',
      complexidade_id: 'complexidade',
      tecnica_id: 'tecnica_de_otimizacao',
      estrutura_id: 'estrutura_de_dados',
      aplicacao_id: 'aplicacao',
      aplicacao_base_id: 'aplicacao',
      aplicacao_nova_id: 'aplicacao',
      implementacao_id: 'implementacao',
      pesquisador_id: 'pesquisador',
    };
    return map[colName];
  }

  useEffect(() => {
    async function loadMetaAndLookups() {
      try {
        const [metaRes, lookupRes] = await Promise.all([
          api.getMetadata(),
          api.getLookups(),
        ]);
        if (metaRes.success && metaRes.data) {
          setEntities(metaRes.data);
        }
        if (lookupRes.success && lookupRes.data) {
          setLookups(lookupRes.data);
        }
      } catch (err) {
        notify('error', 'Falha ao carregar metadados do banco.');
      }
    }
    loadMetaAndLookups();
  }, []);

  useEffect(() => {
    loadEntityData(1);
  }, [selectedEntity]);

  function notify(type, message) {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  }

  async function loadEntityData(page = 1) {
    if (!selectedEntity) return;
    try {
      setLoading(true);
      const res = await api.getCrudList(selectedEntity, {
        page,
        limit: data.limit || 10,
        search,
      });
      if (res.success) {
        setData(res);
      } else {
        notify('error', res.error || 'Erro ao buscar dados.');
      }
    } catch (err) {
      notify('error', 'Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    loadEntityData(1);
  }

  function openCreateModal() {
    const initial = {};
    if (currentEntityMeta) {
      currentEntityMeta.columns.forEach(col => {
        if (col.name !== 'id') {
          initial[col.name] = col.type === 'boolean' ? false : '';
        }
      });
    }
    setFormData(initial);
    setModalMode('create');
  }

  function openEditModal(item) {
    setActiveItem(item);
    setFormData({ ...item });
    setModalMode('edit');
  }

  function openDeleteModal(item) {
    setActiveItem(item);
    setModalMode('delete');
  }

  function getItemId(item) {
    if (!currentEntityMeta) return item.id;
    if (currentEntityMeta.primaryKeys.length > 1) {
      const composite = {};
      currentEntityMeta.primaryKeys.forEach(k => {
        composite[k] = item[k];
      });
      return JSON.stringify(composite);
    }
    return item.id || item[currentEntityMeta.primaryKeys[0]];
  }

  async function handleSaveCreate(e) {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (currentEntityMeta) {
        currentEntityMeta.columns.forEach(c => {
          if (c.name in payload) {
            if (['integer', 'bigint', 'smallint'].includes(c.type)) {
              if (payload[c.name] !== '') payload[c.name] = parseInt(payload[c.name], 10);
            } else if (['numeric', 'real', 'double precision'].includes(c.type)) {
              if (payload[c.name] !== '') payload[c.name] = parseFloat(payload[c.name]);
            } else if (c.type === 'boolean') {
              payload[c.name] = payload[c.name] === true || payload[c.name] === 'true';
            }
          }
        });
      }

      const res = await api.createCrud(selectedEntity, payload);
      if (res.success) {
        notify('success', 'Registro inserido com sucesso!');
        setModalMode(null);
        loadEntityData(data.page);
        // Refresh lookups in case a new item was added
        const lookupRes = await api.getLookups();
        if (lookupRes.success && lookupRes.data) setLookups(lookupRes.data);
      } else {
        notify('error', res.error || 'Erro ao criar registro.');
      }
    } catch (err) {
      notify('error', 'Falha ao salvar registro.');
    }
  }

  async function handleSaveEdit(e) {
    e.preventDefault();
    try {
      const id = getItemId(activeItem);
      const payload = { ...formData };
      delete payload.id;

      if (currentEntityMeta) {
        currentEntityMeta.columns.forEach(c => {
          if (c.name in payload && !currentEntityMeta.primaryKeys.includes(c.name)) {
            if (['integer', 'bigint', 'smallint'].includes(c.type)) {
              if (payload[c.name] !== '') payload[c.name] = parseInt(payload[c.name], 10);
            } else if (['numeric', 'real', 'double precision'].includes(c.type)) {
              if (payload[c.name] !== '') payload[c.name] = parseFloat(payload[c.name]);
            } else if (c.type === 'boolean') {
              payload[c.name] = payload[c.name] === true || payload[c.name] === 'true';
            }
          }
        });
      }

      let queryParams = '';
      if (currentEntityMeta?.primaryKeys?.length > 1) {
        queryParams = `?composite=${encodeURIComponent(id)}`;
      }

      const res = await api.updateCrud(`${selectedEntity}${queryParams}`, id, payload);
      if (res.success) {
        notify('success', 'Registro atualizado com sucesso!');
        setModalMode(null);
        loadEntityData(data.page);
      } else {
        notify('error', res.error || 'Erro ao atualizar.');
      }
    } catch (err) {
      notify('error', 'Falha ao atualizar registro.');
    }
  }

  async function handleConfirmDelete() {
    try {
      const id = getItemId(activeItem);
      let queryParams = '';
      if (currentEntityMeta?.primaryKeys?.length > 1) {
        queryParams = `?composite=${encodeURIComponent(id)}`;
      }
      const res = await api.deleteCrud(`${selectedEntity}${queryParams}`, id);
      if (res.success) {
        notify('success', 'Registro removido com sucesso!');
        setModalMode(null);
        loadEntityData(data.page);
      } else {
        notify('error', res.error || 'Erro ao excluir.');
      }
    } catch (err) {
      notify('error', 'Falha ao excluir registro.');
    }
  }

  const columns = currentEntityMeta ? currentEntityMeta.columns.map(c => c.name) : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl border text-sm animate-fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-500/50'
              : 'bg-rose-950/90 text-rose-200 border-rose-500/50'
          }`}
        >
          {notification.type === 'success' ? <Check className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {notification.message}
        </div>
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Gerenciador de Entidades (CRUD)</h2>
            <p className="text-xs text-slate-400">Inserção com seleção por nomes de chaves estrangeiras, busca e edição</p>
          </div>
        </div>

        {/* Entity Selector */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-slate-400">Tabela:</label>
          <select
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl px-3 py-2 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            {entities.map(e => (
              <option key={e.name} value={e.name}>
                {friendlyNames[e.name.toLowerCase()] || e.name} ({e.rowCount} registros)
              </option>
            ))}
          </select>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/30"
          >
            <Plus className="h-4 w-4" />
            Novo Registro
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative">
          <Search className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Buscar em ${friendlyNames[selectedEntity.toLowerCase()] || selectedEntity}...`}
            className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 text-slate-200 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
          />
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={() => loadEntityData(data.page)}
            disabled={loading}
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl transition-all"
            title="Recarregar dados"
          >
            <RotateCw className={`h-4 w-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
          </button>
          <span className="text-xs text-slate-400">
            Total: <strong className="text-slate-200">{data.total}</strong> itens
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/70 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                {columns.map(col => (
                  <th key={col} className="px-4 py-3.5 whitespace-nowrap">
                    {col.replace(/_id$/, ' (FK)').replace(/_/g, ' ')}
                  </th>
                ))}
                <th className="px-4 py-3.5 text-right whitespace-nowrap">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-500">
                    <RotateCw className="h-5 w-5 animate-spin mx-auto mb-2 text-indigo-400" />
                    Carregando dados da tabela...
                  </td>
                </tr>
              ) : data.rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-slate-500 font-sans">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                data.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    {columns.map(col => {
                      const val = row[col];
                      const fkKey = getForeignKeyLookupKey(col);
                      const fkOption = fkKey && lookups[fkKey]?.find(o => o.id === val);

                      let displayVal = val;
                      if (fkOption) {
                        displayVal = (
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-200" title={`ID: ${val}`}>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">#{val}</span>
                            <span className="text-slate-300">{fkOption.label}</span>
                          </span>
                        );
                      } else if (typeof val === 'boolean') {
                        displayVal = (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${val ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                            {val ? 'SIM' : 'NÃO'}
                          </span>
                        );
                      } else if (val === null || val === undefined) {
                        displayVal = <span className="text-slate-600">NULL</span>;
                      } else if (typeof val === 'string' && val.length > 50) {
                        displayVal = `${val.substring(0, 50)}...`;
                      }

                      return (
                        <td key={col} className="px-4 py-3 whitespace-nowrap font-sans text-slate-300">
                          {displayVal}
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-right whitespace-nowrap font-sans">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(row)}
                          className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all"
                          title="Editar"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(row)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
                          title="Excluir"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-900/90 text-xs">
          <span className="text-slate-400">
            Página <strong className="text-slate-200">{data.page}</strong> de <strong className="text-slate-200">{data.totalPages || 1}</strong>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => loadEntityData(data.page - 1)}
              disabled={data.page <= 1 || loading}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => loadEntityData(data.page + 1)}
              disabled={data.page >= data.totalPages || loading}
              className="p-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Create or Edit */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {modalMode === 'create' ? 'Adicionar Novo Registro' : 'Editar Registro'}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={modalMode === 'create' ? handleSaveCreate : handleSaveEdit} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentEntityMeta?.columns
                  .filter(col => modalMode === 'create' ? col.name !== 'id' : true)
                  .map(col => {
                    const isPk = currentEntityMeta.primaryKeys.includes(col.name);
                    const isReadOnly = modalMode === 'edit' && isPk;
                    const fkKey = getForeignKeyLookupKey(col.name);
                    const fkOptions = fkKey ? lookups[fkKey] : null;

                    // 1. Foreign Key Dropdown
                    if (fkOptions && Array.isArray(fkOptions)) {
                      return (
                        <div key={col.name} className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                            <span>
                              {col.name.replace(/_id$/, '')} (Chave Estrangeira)
                              {!col.isNullable && <span className="text-rose-400 ml-0.5">*</span>}
                            </span>
                            <span className="text-[10px] text-indigo-400 flex items-center gap-1 font-mono">
                              <Link2 className="h-3 w-3" /> ref: {fkKey}
                            </span>
                          </label>
                          <select
                            value={formData[col.name] ?? ''}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              [col.name]: e.target.value === '' ? '' : parseInt(e.target.value, 10) 
                            })}
                            disabled={isReadOnly}
                            required={!col.isNullable}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                          >
                            <option value="">Selecione uma opção da lista...</option>
                            {fkOptions.map(opt => (
                              <option key={opt.id} value={opt.id}>
                                {opt.label} (ID: {opt.id})
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    }

                    // 2. Regular Textarea
                    if (col.type === 'text') {
                      return (
                        <div key={col.name} className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            {col.name} {col.isNullable ? '' : <span className="text-rose-400">*</span>}
                            <span className="text-[10px] text-slate-500 ml-1">({col.type})</span>
                          </label>
                          <textarea
                            value={formData[col.name] ?? ''}
                            onChange={(e) => setFormData({ ...formData, [col.name]: e.target.value })}
                            rows={3}
                            disabled={isReadOnly}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                          />
                        </div>
                      );
                    }

                    // 3. Boolean
                    if (col.type === 'boolean') {
                      return (
                        <div key={col.name}>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">
                            {col.name} {col.isNullable ? '' : <span className="text-rose-400">*</span>}
                          </label>
                          <select
                            value={String(formData[col.name] ?? false)}
                            onChange={(e) => setFormData({ ...formData, [col.name]: e.target.value === 'true' })}
                            disabled={isReadOnly}
                            className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="true">true (Verdadeiro)</option>
                            <option value="false">false (Falso)</option>
                          </select>
                        </div>
                      );
                    }

                    // 4. Default Input
                    return (
                      <div key={col.name}>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          {col.name} {col.isNullable ? '' : <span className="text-rose-400">*</span>}
                          <span className="text-[10px] text-slate-500 ml-1">({col.type})</span>
                        </label>
                        <input
                          type={['integer', 'bigint', 'numeric', 'real'].includes(col.type) ? 'number' : col.type === 'date' ? 'date' : 'text'}
                          step={['numeric', 'real'].includes(col.type) ? '0.0001' : '1'}
                          value={formData[col.name] ?? ''}
                          onChange={(e) => setFormData({ ...formData, [col.name]: e.target.value })}
                          disabled={isReadOnly}
                          required={!col.isNullable && col.name !== 'id'}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                        />
                      </div>
                    );
                  })}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {modalMode === 'delete' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-rose-400" />
              Confirmar Exclusão
            </h3>
            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              Tem certeza que deseja remover este registro da tabela <strong className="text-white">{selectedEntity}</strong>?
            </p>
            <div className="mt-3 p-3 rounded-lg bg-slate-800/80 font-mono text-[11px] text-slate-400 overflow-x-auto">
              {JSON.stringify(activeItem, null, 2)}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
