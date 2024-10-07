import React, { useState } from 'react';
import { Edit, Trash, Plus, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LinkEntry {
  id: number;
  name: string;
  url: string;
  description: string;
  category: string;
  tags: string[];
}

const LinksLog: React.FC = () => {
  const [links, setLinks] = useState<LinkEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<LinkEntry | null>(null);
  const { theme } = useTheme();

  const handleAddEdit = (entry: LinkEntry | null) => {
    setCurrentEntry(entry);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setLinks(links.filter(l => l.id !== id));
  };

  const handleSave = (entry: LinkEntry) => {
    if (entry.id) {
      setLinks(links.map(l => l.id === entry.id ? entry : l));
    } else {
      setLinks([...links, { ...entry, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4">Links Log</h2>
      <button
        onClick={() => handleAddEdit(null)}
        className="mb-4 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="mr-2" size={16} />
        Add New Link
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200`}>
            {links.map((entry) => (
              <LinkRow key={entry.id} entry={entry} onEdit={handleAddEdit} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <LinkModal
          entry={currentEntry}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const LinkRow: React.FC<{
  entry: LinkEntry;
  onEdit: (entry: LinkEntry) => void;
  onDelete: (id: number) => void;
}> = ({ entry, onEdit, onDelete }) => {
  const { theme } = useTheme();

  return (
    <tr className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
      <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 flex items-center">
          {entry.url.length > 30 ? entry.url.substring(0, 30) + '...' : entry.url}
          <ExternalLink size={14} className="ml-1" />
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{entry.description}</td>
      <td className="px-6 py-4 whitespace-nowrap">{entry.category}</td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-1">
          {entry.tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button onClick={() => onEdit(entry)} className="text-indigo-600 hover:text-indigo-900 mr-2">
          <Edit size={16} />
        </button>
        <button onClick={() => onDelete(entry.id)} className="text-red-600 hover:text-red-900">
          <Trash size={16} />
        </button>
      </td>
    </tr>
  );
};

const LinkModal: React.FC<{
  entry: LinkEntry | null;
  onSave: (entry: LinkEntry) => void;
  onClose: () => void;
}> = ({ entry, onSave, onClose }) => {
  const [formData, setFormData] = useState<LinkEntry>(
    entry || {
      id: 0,
      name: '',
      url: '',
      description: '',
      category: '',
      tags: [],
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData({ ...formData, tags });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                <input type="url" name="url" id="url" value={formData.url} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                <input type="text" name="tags" id="tags" value={formData.tags.join(', ')} onChange={handleTagsChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                Save
              </button>
              <button type="button" onClick={onClose} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LinksLog;