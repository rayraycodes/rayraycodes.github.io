import React from 'react';

interface TableProps {
  items: { name: string; link: string; }[];
}

const Table: React.FC<TableProps> = ({ items }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-300">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-300">Link</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-b border-gray-200 text-left">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 border-b border-gray-200 text-left">
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;