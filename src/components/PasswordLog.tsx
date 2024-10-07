import React, { useState } from 'react';
import { Eye, EyeOff, Edit, Trash, Plus } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface PasswordEntry {
  id: number;
  name: string;
  email: string;
  password: string;
  link: string;
  description: string;
  type: 'Free' | 'Paid';
  sublinks: string[];
}

interface PasswordLogProps {
  type: 'personal' | 'business';
}

const PasswordLog: React.FC<PasswordLogProps> = ({ type }) => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<PasswordEntry | null>(null);
  const { theme } = useTheme();

  const handleAddEdit = (entry: PasswordEntry | null) => {
    setCurrentEntry(entry);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    setPasswords(passwords.filter(p => p.id !== id));
  };

  const handleSave = (entry: PasswordEntry) => {
    if (entry.id) {
      setPasswords(passwords.map(p => p.id === entry.id ? entry : p));
    } else {
      setPasswords([...passwords, { ...entry, id: Date.now() }]);
    }
    setShowModal(false);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-4">{type === 'personal' ? 'Personal' : 'Business'} Password Log</h2>
      <button
        onClick={() => handleAddEdit(null)}
        className="mb-4 flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="mr-2" size={16} />
        Add New Entry
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} divide-y divide-gray-200`}>
            {passwords.map((entry) => (
              <PasswordRow key={entry.id} entry={entry} onEdit={handleAddEdit} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <PasswordModal
          entry={currentEntry}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const PasswordRow: React.FC<{
  entry: PasswordEntry;
  onEdit: (entry: PasswordEntry) => void;
  onDelete: (id: number) => void;
}> = ({ entry, onEdit, onDelete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  return (
    <tr className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
      <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="mr-2">{showPassword ? entry.password : '••••••••'}</span>
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <a href={entry.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
          {entry.link}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{entry.description}</td>
      <td className="px-6 py-4 whitespace-nowrap">{entry.type}</td>
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

const PasswordModal: React.FC<{
  entry: PasswordEntry | null;
  onSave: (entry: PasswordEntry) => void;
  onClose: () => void;
}> = ({ entry, onSave, onClose }) => {
  const [formData, setFormData] = useState<PasswordEntry>(
    entry || {
      id: 0,
      name: '',
      email: '',
      password: '',
      link: '',
      description: '',
      type: 'Free',
      sublinks: [],
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
                <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                <select name="type" id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
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

export default PasswordLog;