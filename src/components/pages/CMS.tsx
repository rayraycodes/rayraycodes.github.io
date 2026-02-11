import { useState, useEffect } from 'react';
import { Save, Download, Plus, Trash2, Edit2, X, Image as ImageIcon, Lock } from 'lucide-react';
import contentData from '../../data/content';

// Password protection - change this to your desired password
const CMS_PASSWORD = 'reganmaharjan'; // You can change this to any password you want

interface Photo {
  id: number | string;
  url: string;
  title: string;
  category: string | string[];
  description: string;
  date: string;
  location: string;
  story: string;
}

type ContentTab = 'navigation' | 'home' | 'about' | 'experience' | 'projects' | 'impact' | 'contact' | 'accessibility' | 'photography';

export function CMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<ContentTab>('photography');
  
  // State for all content sections - with error handling
  const [allContent, setAllContent] = useState<any>(() => {
    try {
      return contentData || {};
    } catch (error) {
      console.error('Error loading contentData:', error);
      return {};
    }
  });
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingSection, setEditingSection] = useState<string>('');
  const [hasChanges, setHasChanges] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const authStatus = sessionStorage.getItem('cms-authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cms-all-content');
    if (saved) {
      try {
        setAllContent(JSON.parse(saved));
        setHasChanges(true);
      } catch (e) {
        console.error('Failed to load saved data');
      }
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (hasChanges) {
      localStorage.setItem('cms-all-content', JSON.stringify(allContent));
    }
  }, [allContent, hasChanges]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CMS_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('cms-authenticated', 'true');
      setPasswordError('');
      setPassword('');
    } else {
      setPasswordError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('cms-authenticated');
    setPassword('');
  };

  // Safety check - ensure contentData is loaded
  if (!allContent || Object.keys(allContent).length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading CMS...</h1>
          <p className="text-gray-600">Please wait while content loads.</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Enter password to access CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  passwordError ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
                autoFocus
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Access CMS
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Generic update function for nested content
  const updateContent = (section: string, path: string[], value: any) => {
    setAllContent((prev: any) => {
      const updated = { ...prev };
      let current: any = updated[section];
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]] = { ...current[path[i]] };
      }
      current[path[path.length - 1]] = value;
      return updated;
    });
        setHasChanges(true);
  };

  // Generic handlers for array items
  const handleAddItem = (section: string, arrayPath: string[], defaultItem: any) => {
    setEditingItem(defaultItem);
    setEditingSection(`${section}.${arrayPath.join('.')}`);
    setIsEditing(true);
  };

  const handleEditItem = (section: string, arrayPath: string[], item: any, index: number) => {
    setEditingItem({ ...item, _index: index });
    setEditingSection(`${section}.${arrayPath.join('.')}`);
    setIsEditing(true);
  };

  const handleSaveItem = () => {
    if (!editingItem || !editingSection) return;
    
    const [section, ...pathParts] = editingSection.split('.');
    const arrayPath = pathParts.slice(0, -1);
    const arrayName = pathParts[pathParts.length - 1];
    
    setAllContent((prev: any) => {
      const updated = { ...prev };
      let current: any = updated[section];
      for (const path of arrayPath) {
        current = current[path] = { ...current[path] };
      }
      const array = [...(current[arrayName] || [])];
      const { _index, ...itemData } = editingItem;
      
      if (_index !== undefined) {
        array[_index] = itemData;
      } else {
        array.push(itemData);
      }
      current[arrayName] = array;
      return updated;
    });
    
    setIsEditing(false);
    setEditingItem(null);
    setEditingSection('');
    setHasChanges(true);
  };

  const handleDeleteItem = (section: string, arrayPath: string[], index: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setAllContent((prev: any) => {
        const updated = { ...prev };
        let current: any = updated[section];
        for (const path of arrayPath.slice(0, -1)) {
          current = current[path] = { ...current[path] };
        }
        const arrayName = arrayPath[arrayPath.length - 1];
        current[arrayName] = current[arrayName].filter((_: any, i: number) => i !== index);
        return updated;
      });
      setHasChanges(true);
    }
  };

  // Photography-specific handlers
  const handleEditPhoto = (photo: Photo) => {
    // Normalize category to array for editing
    const normalizedCategory = Array.isArray(photo.category) 
      ? photo.category 
      : photo.category ? [photo.category] : [];
    
    setEditingPhoto({ 
      ...photo, 
      category: normalizedCategory 
    });
    setIsEditing(true);
  };

  const handleSavePhoto = () => {
    if (!editingPhoto) return;

    // Ensure category is an array
    const normalizedCategory = Array.isArray(editingPhoto.category) 
      ? editingPhoto.category 
      : editingPhoto.category ? [editingPhoto.category] : [];
    
    // Ensure at least one category is selected
    if (normalizedCategory.length === 0) {
      alert('Please select at least one category');
      return;
    }

    const photoToSave = {
      ...editingPhoto,
      category: normalizedCategory.length === 1 ? normalizedCategory[0] : normalizedCategory
    };

    // Check if this is a new photo (not in existing images) or updating existing
    const existingIndex = allContent.photography.images.findIndex((img: any) => img.id === editingPhoto.id);
    
    let updatedImages;
    if (existingIndex >= 0) {
      // Update existing photo
      updatedImages = allContent.photography.images.map((img: any) =>
        img.id === editingPhoto.id ? photoToSave : img
      );
    } else {
      // Add new photo
      updatedImages = [...allContent.photography.images, photoToSave];
    }

    setAllContent((prev: any) => ({
      ...prev,
      photography: { ...prev.photography, images: updatedImages }
    }));
    setIsEditing(false);
    setEditingPhoto(null);
    setHasChanges(true);
  };

  const handleAddPhoto = () => {
    const defaultCategory = allContent.photography.categories.find((c: string) => c !== 'All') || 'Nature';
    const newPhoto: Photo = {
      id: Date.now(),
      url: '',
      title: 'New Photo',
      category: [defaultCategory], // Start with array for multiple categories
      description: '',
      date: new Date().getFullYear().toString(),
      location: '',
      story: '',
    };
    setEditingPhoto(newPhoto);
    setIsEditing(true);
  };

  const handleDeletePhoto = (id: number | string) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      setAllContent((prev: any) => ({
        ...prev,
        photography: {
          ...prev.photography,
          images: prev.photography.images.filter((img: any) => img.id !== id)
        }
      }));
      setHasChanges(true);
    }
  };

  const handleUpdateHero = (section: string, field: string, value: string) => {
    setAllContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        hero: { ...prev[section].hero, [field]: value }
      }
    }));
    setHasChanges(true);
  };

  const handleUpdateCategories = (categories: string[]) => {
    setAllContent((prev: any) => ({
      ...prev,
      photography: { ...prev.photography, categories }
    }));
    setHasChanges(true);
  };

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(allContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all-content.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveToFile = async () => {
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(allContent),
      });

      const result = await response.json();

      if (result.success) {
        setHasChanges(false);
        alert('Content saved successfully to content.ts!');
        // Reload the page to reflect changes
        window.location.reload();
      } else {
        alert(`Error saving content: ${result.error}`);
      }
    } catch (error: any) {
      alert(`Error saving content: ${error.message}`);
    }
  };

  const copyToClipboard = () => {
    const content = `// All content from CMS
const contentData = ${JSON.stringify(allContent, null, 2)};

export default contentData;`;
    navigator.clipboard.writeText(content);
    alert('Content copied to clipboard! Paste it into your content.ts file.');
  };

  return (
    <div className="min-h-screen bg-gray-50" data-content-wrapper="true" style={{ paddingTop: 'var(--nav-height, 96px)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
            <p className="text-gray-600">Edit and manage your portfolio content</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
          {(['navigation', 'home', 'about', 'experience', 'projects', 'impact', 'contact', 'accessibility', 'photography'] as ContentTab[]).map((tab) => (
          <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
          ))}
        </div>

        {/* Action Bar */}
        {hasChanges && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
            <span className="text-blue-800 font-medium">You have unsaved changes</span>
            <div className="flex gap-3">
              <button
                onClick={saveToFile}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Save className="w-4 h-4" />
                Save to content.ts
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Copy to Clipboard
              </button>
              <button
                onClick={exportContent}
                className="px-4 py-2 bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                Export JSON
              </button>
            </div>
          </div>
        )}

        {/* Photography CMS */}
        {activeTab === 'photography' && (
          <div className="space-y-8">
            {/* Hero Section Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent?.photography?.hero?.title || ''}
                    onChange={(e) => handleUpdateHero('photography', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={allContent?.photography?.hero?.subtitle || ''}
                    onChange={(e) => handleUpdateHero('photography', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Categories Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {(allContent?.photography?.categories || []).map((cat: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <input
                      type="text"
                      value={cat}
                      onChange={(e) => {
                        const updated = [...(allContent?.photography?.categories || [])];
                        updated[index] = e.target.value;
                        handleUpdateCategories(updated);
                      }}
                      className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-medium"
                    />
                    {cat !== 'All' && (
                      <button
                        onClick={() => {
                          const updated = (allContent?.photography?.categories || []).filter((_: any, i: number) => i !== index);
                          handleUpdateCategories(updated);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => handleUpdateCategories([...(allContent?.photography?.categories || []), 'New Category'])}
                  className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  + Add Category
                </button>
              </div>
            </div>

            {/* Photos Editor */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Photos</h2>
                <button
                  onClick={handleAddPhoto}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Photo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(allContent?.photography?.images || []).map((photo: any) => (
                  <div
                    key={photo.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {photo.url ? (
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">{photo.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 truncate">{photo.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(Array.isArray(photo.category) ? photo.category : [photo.category]).map((cat: string, idx: number) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPhoto(photo)}
                          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generic Item Editor Modal */}
        {isEditing && editingItem && !editingPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Edit Item</h3>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingItem(null);
                    setEditingSection('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {Object.keys(editingItem).filter(key => key !== '_index').map((key) => {
                  const value = editingItem[key];
                  const isArray = Array.isArray(value);
                  const isObject = typeof value === 'object' && value !== null && !isArray;
                  
                  if (isObject) {
                    return (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key}</label>
                        <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
                          {Object.keys(value).map((subKey) => (
                            <div key={subKey}>
                              <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">{subKey}</label>
                              {Array.isArray(value[subKey]) ? (
                                <div className="space-y-2">
                                  {value[subKey].map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-2">
                                      <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => {
                                          const updated = [...value[subKey]];
                                          updated[idx] = e.target.value;
                                          setEditingItem({ ...editingItem, [key]: { ...value, [subKey]: updated } });
                                        }}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      />
                                      <button
                                        onClick={() => {
                                          const updated = value[subKey].filter((_: any, i: number) => i !== idx);
                                          setEditingItem({ ...editingItem, [key]: { ...value, [subKey]: updated } });
                                        }}
                                        className="p-2 text-red-600 hover:text-red-700"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => {
                                      const updated = [...value[subKey], ''];
                                      setEditingItem({ ...editingItem, [key]: { ...value, [subKey]: updated } });
                                    }}
                                    className="px-3 py-1 text-sm border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
                                  >
                                    + Add
                                  </button>
                                </div>
                              ) : (
                                <textarea
                                  value={value[subKey] || ''}
                                  onChange={(e) => setEditingItem({ ...editingItem, [key]: { ...value, [subKey]: e.target.value } })}
                                  rows={2}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  
                  if (isArray) {
                    return (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key}</label>
                        <div className="space-y-2">
                          {value.map((item: any, idx: number) => (
                            <div key={idx} className="flex gap-2">
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const updated = [...value];
                                  updated[idx] = e.target.value;
                                  setEditingItem({ ...editingItem, [key]: updated });
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <button
                                onClick={() => {
                                  const updated = value.filter((_: any, i: number) => i !== idx);
                                  setEditingItem({ ...editingItem, [key]: updated });
                                }}
                                className="p-2 text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const updated = [...value, ''];
                              setEditingItem({ ...editingItem, [key]: updated });
                            }}
                            className="px-3 py-1 text-sm border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
                          >
                            + Add {key}
                          </button>
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{key}</label>
                      {key.toLowerCase().includes('description') || key.toLowerCase().includes('story') || key.toLowerCase().includes('excerpt') || key.toLowerCase().includes('content') ? (
                        <textarea
                          value={value || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, [key]: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={value || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, [key]: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingItem(null);
                      setEditingSection('');
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveItem}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Photo Modal */}
        {isEditing && editingPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Edit Photo</h3>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPhoto(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingPhoto.url}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, url: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="src/assets/image.jpg or https://..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={editingPhoto.title}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                    <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto">
                      {(allContent?.photography?.categories || [])
                        .filter((cat: string) => cat !== 'All')
                        .map((cat: string) => {
                          // Normalize category to array for checking
                          const photoCategories = Array.isArray(editingPhoto.category) 
                            ? editingPhoto.category 
                            : editingPhoto.category ? [editingPhoto.category] : [];
                          const isChecked = photoCategories.includes(cat);
                          
                          return (
                            <label key={cat} className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 rounded px-2">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  const currentCategories = Array.isArray(editingPhoto.category) 
                                    ? [...editingPhoto.category] 
                                    : editingPhoto.category ? [editingPhoto.category] : [];
                                  
                                  if (e.target.checked) {
                                    // Add category if not already present
                                    if (!currentCategories.includes(cat)) {
                                      setEditingPhoto({ ...editingPhoto, category: [...currentCategories, cat] });
                                    }
                                  } else {
                                    // Remove category
                                    setEditingPhoto({ 
                                      ...editingPhoto, 
                                      category: currentCategories.filter((c: string) => c !== cat) 
                                    });
                                  }
                                }}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">{cat}</span>
                            </label>
                          );
                        })}
                    </div>
                    {(() => {
                      const selectedCategories = Array.isArray(editingPhoto.category) 
                        ? editingPhoto.category 
                        : editingPhoto.category ? [editingPhoto.category] : [];
                      if (selectedCategories.length === 0) {
                        return (
                          <p className="mt-2 text-sm text-amber-600">Please select at least one category</p>
                        );
                      }
                      return (
                        <p className="mt-2 text-sm text-gray-500">
                          Selected: {selectedCategories.join(', ')}
                        </p>
                      );
                    })()}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingPhoto.description}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="text"
                      value={editingPhoto.date}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={editingPhoto.location}
                      onChange={(e) => setEditingPhoto({ ...editingPhoto, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Story</label>
                  <textarea
                    value={editingPhoto.story}
                    onChange={(e) => setEditingPhoto({ ...editingPhoto, story: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell the story behind this photograph..."
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingPhoto(null);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePhoto}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation CMS */}
        {activeTab === 'navigation' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Site Name</h2>
              <input
                type="text"
                value={allContent.navigation.siteName}
                onChange={(e) => updateContent('navigation', ['siteName'], e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Navigation Links</h2>
                <button
                  onClick={() => handleAddItem('navigation', ['links'], { path: '/', label: 'New Link' })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Link
                </button>
              </div>
              <div className="space-y-3">
                {allContent.navigation.links.map((link: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
                    <input
                      type="text"
                      value={link.path}
                      onChange={(e) => {
                        const updated = [...allContent.navigation.links];
                        updated[index] = { ...updated[index], path: e.target.value };
                        updateContent('navigation', ['links'], updated);
                      }}
                      placeholder="Path"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const updated = [...allContent.navigation.links];
                        updated[index] = { ...updated[index], label: e.target.value };
                        updateContent('navigation', ['links'], updated);
                      }}
                      placeholder="Label"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleDeleteItem('navigation', ['links'], index)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Home CMS */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <textarea
                    value={allContent.home.hero.title}
                    onChange={(e) => handleUpdateHero('home', 'title', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={allContent.home.hero.subtitle}
                    onChange={(e) => handleUpdateHero('home', 'subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA</label>
                    <input
                      type="text"
                      value={allContent.home.hero.ctaPrimary}
                      onChange={(e) => updateContent('home', ['hero', 'ctaPrimary'], e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA</label>
                    <input
                      type="text"
                      value={allContent.home.hero.ctaSecondary}
                      onChange={(e) => updateContent('home', ['hero', 'ctaSecondary'], e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Highlights</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.home.highlights.title}
                    onChange={(e) => updateContent('home', ['highlights', 'title'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={allContent.home.highlights.subtitle}
                    onChange={(e) => updateContent('home', ['highlights', 'subtitle'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Items</h3>
                  <button
                    onClick={() => handleAddItem('home', ['highlights', 'items'], { title: 'New Item', description: '', icon: '📦' })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
                <div className="space-y-3">
                  {allContent.home.highlights.items.map((item: any, index: number) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                        <button
                          onClick={() => handleDeleteItem('home', ['highlights', 'items'], index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...allContent.home.highlights.items];
                          updated[index] = { ...updated[index], title: e.target.value };
                          updateContent('home', ['highlights', 'items'], updated);
                        }}
                        placeholder="Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...allContent.home.highlights.items];
                          updated[index] = { ...updated[index], description: e.target.value };
                          updateContent('home', ['highlights', 'items'], updated);
                        }}
                        placeholder="Description"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={item.icon}
                        onChange={(e) => {
                          const updated = [...allContent.home.highlights.items];
                          updated[index] = { ...updated[index], icon: e.target.value };
                          updateContent('home', ['highlights', 'items'], updated);
                        }}
                        placeholder="Icon (emoji)"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About CMS */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.about.hero.title}
                    onChange={(e) => handleUpdateHero('about', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div className="space-y-2">
                    {allContent.about.hero.description.map((desc: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <textarea
                          value={desc}
                          onChange={(e) => {
                            const updated = [...allContent.about.hero.description];
                            updated[index] = e.target.value;
                            updateContent('about', ['hero', 'description'], updated);
                          }}
                          rows={2}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        <button
                          onClick={() => {
                            const updated = allContent.about.hero.description.filter((_: any, i: number) => i !== index);
                            updateContent('about', ['hero', 'description'], updated);
                          }}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = [...allContent.about.hero.description, ''];
                        updateContent('about', ['hero', 'description'], updated);
                      }}
                      className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                    >
                      + Add Paragraph
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Strengths</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.about.strengths.title}
                    onChange={(e) => updateContent('about', ['strengths', 'title'], e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Items</h3>
                  <button
                    onClick={() => handleAddItem('about', ['strengths', 'items'], { title: 'New Strength', description: '' })}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Strength
                  </button>
                </div>
                <div className="space-y-3">
                  {allContent.about.strengths.items.map((item: any, index: number) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">Strength {index + 1}</h4>
                        <button
                          onClick={() => handleDeleteItem('about', ['strengths', 'items'], index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const updated = [...allContent.about.strengths.items];
                          updated[index] = { ...updated[index], title: e.target.value };
                          updateContent('about', ['strengths', 'items'], updated);
                        }}
                        placeholder="Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          const updated = [...allContent.about.strengths.items];
                          updated[index] = { ...updated[index], description: e.target.value };
                          updateContent('about', ['strengths', 'items'], updated);
                        }}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Timeline</h2>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Items</h3>
                <button
                  onClick={() => handleAddItem('about', ['timeline', 'items'], { year: '2024', title: 'New Role', org: '', description: '' })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Timeline Item
                </button>
              </div>
              <div className="space-y-3">
                {allContent.about.timeline.items.map((item: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                      <button
                        onClick={() => handleDeleteItem('about', ['timeline', 'items'], index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => {
                          const updated = [...allContent.about.timeline.items];
                          updated[index] = { ...updated[index], year: e.target.value };
                          updateContent('about', ['timeline', 'items'], updated);
                        }}
                        placeholder="Year"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={item.org}
                        onChange={(e) => {
                          const updated = [...allContent.about.timeline.items];
                          updated[index] = { ...updated[index], org: e.target.value };
                          updateContent('about', ['timeline', 'items'], updated);
                        }}
                        placeholder="Organization"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...allContent.about.timeline.items];
                        updated[index] = { ...updated[index], title: e.target.value };
                        updateContent('about', ['timeline', 'items'], updated);
                      }}
                      placeholder="Title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={item.description}
                      onChange={(e) => {
                        const updated = [...allContent.about.timeline.items];
                        updated[index] = { ...updated[index], description: e.target.value };
                        updateContent('about', ['timeline', 'items'], updated);
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience CMS */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.experience.hero.title}
                    onChange={(e) => handleUpdateHero('experience', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={allContent.experience.hero.subtitle}
                    onChange={(e) => handleUpdateHero('experience', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Experiences</h2>
                <button
                  onClick={() => handleAddItem('experience', ['experiences'], {
                    company: '',
                    role: '',
                    period: '',
                    location: '',
                    description: '',
                    highlights: [],
                    skills: [],
                    theme: 'blue'
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>
              <div className="space-y-4">
                {allContent.experience.experiences.map((exp: any, index: number) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{exp.company || `Experience ${index + 1}`}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem('experience', ['experiences'], exp, index)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('experience', ['experiences'], index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="font-medium">Role:</span> {exp.role}</div>
                      <div><span className="font-medium">Period:</span> {exp.period}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects CMS */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.projects.hero.title}
                    onChange={(e) => handleUpdateHero('projects', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={allContent.projects.hero.subtitle}
                    onChange={(e) => handleUpdateHero('projects', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
                <button
                  onClick={() => handleAddItem('projects', ['projects'], {
                    title: 'New Project',
                    category: '',
                    description: '',
                    problem: '',
                    approach: '',
                    solution: '',
                    result: '',
                    metrics: [],
                    tags: [],
                    impact: ''
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
              <div className="space-y-4">
                {allContent.projects.projects.map((project: any, index: number) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title || `Project ${index + 1}`}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem('projects', ['projects'], project, index)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('projects', ['projects'], index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{project.description || 'No description'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Impact CMS */}
        {activeTab === 'impact' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.impact.hero.title}
                    onChange={(e) => handleUpdateHero('impact', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={allContent.impact.hero.subtitle}
                    onChange={(e) => handleUpdateHero('impact', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Stories</h2>
                <button
                  onClick={() => handleAddItem('impact', ['stories'], {
                    id: `story-${Date.now()}`,
                    title: 'New Story',
                    excerpt: '',
                    date: new Date().getFullYear().toString(),
                    icon: 'Globe',
                    theme: 'blue',
                    content: { description: '', work: [], impact: '' }
                  })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Story
                </button>
              </div>
              <div className="space-y-4">
                {allContent.impact.stories.map((story: any, index: number) => (
                  <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{story.title || `Story ${index + 1}`}</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditItem('impact', ['stories'], story, index)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem('impact', ['stories'], index)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{story.excerpt || 'No excerpt'}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact CMS */}
        {activeTab === 'contact' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.contact.hero.title}
                    onChange={(e) => handleUpdateHero('contact', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={allContent.contact.hero.subtitle}
                    onChange={(e) => handleUpdateHero('contact', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Social Links</h2>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Links</h3>
                <button
                  onClick={() => handleAddItem('contact', ['social', 'links'], { label: 'New Link', href: '', handle: '' })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Link
                </button>
              </div>
              <div className="space-y-3">
                {allContent.contact.social.links.map((link: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{link.label || `Link ${index + 1}`}</h4>
                      <button
                        onClick={() => handleDeleteItem('contact', ['social', 'links'], index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const updated = [...allContent.contact.social.links];
                        updated[index] = { ...updated[index], label: e.target.value };
                        updateContent('contact', ['social', 'links'], updated);
                      }}
                      placeholder="Label"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => {
                        const updated = [...allContent.contact.social.links];
                        updated[index] = { ...updated[index], href: e.target.value };
                        updateContent('contact', ['social', 'links'], updated);
                      }}
                      placeholder="URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={link.handle}
                      onChange={(e) => {
                        const updated = [...allContent.contact.social.links];
                        updated[index] = { ...updated[index], handle: e.target.value };
                        updateContent('contact', ['social', 'links'], updated);
                      }}
                      placeholder="Handle"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Accessibility CMS */}
        {activeTab === 'accessibility' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={allContent.accessibility.hero.title}
                    onChange={(e) => handleUpdateHero('accessibility', 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <textarea
                    value={allContent.accessibility.hero.subtitle}
                    onChange={(e) => handleUpdateHero('accessibility', 'subtitle', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Philosophy Principles</h2>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Principles</h3>
                <button
                  onClick={() => handleAddItem('accessibility', ['philosophy', 'principles'], { title: 'New Principle', description: '' })}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Principle
                </button>
              </div>
              <div className="space-y-3">
                {allContent.accessibility.philosophy.principles.map((principle: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{principle.title || `Principle ${index + 1}`}</h4>
                      <button
                        onClick={() => handleDeleteItem('accessibility', ['philosophy', 'principles'], index)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={principle.title}
                      onChange={(e) => {
                        const updated = [...allContent.accessibility.philosophy.principles];
                        updated[index] = { ...updated[index], title: e.target.value };
                        updateContent('accessibility', ['philosophy', 'principles'], updated);
                      }}
                      placeholder="Title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={principle.description}
                      onChange={(e) => {
                        const updated = [...allContent.accessibility.philosophy.principles];
                        updated[index] = { ...updated[index], description: e.target.value };
                        updateContent('accessibility', ['philosophy', 'principles'], updated);
                      }}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

