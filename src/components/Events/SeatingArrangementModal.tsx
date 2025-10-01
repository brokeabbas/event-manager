import React, { useState } from 'react';

interface SeatingArrangementModalProps {
  visible: boolean;
  onClose: () => void;
}

const SeatingArrangementModal: React.FC<SeatingArrangementModalProps> = ({ visible, onClose }) => {
  const [categories, setCategories] = useState<{ name: string; color: string }[]>([]);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#10B981' });
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);

  const [sections, setSections] = useState<
    { name: string; seats: number[][] }[]
  >([{ name: 'Main', seats: Array.from({ length: 6 }, () => Array(6).fill(-1)) }]);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [newSectionName, setNewSectionName] = useState('');
  const [rows, setRows] = useState(6);
  const [cols, setCols] = useState(6);

  const [batchStart, setBatchStart] = useState({ row: 0, col: 0 });
  const [batchEnd, setBatchEnd] = useState({ row: 0, col: 0 });

  const handleAddCategory = () => {
    if (!newCategory.name.trim()) return;
    setCategories([...categories, newCategory]);
    setNewCategory({ name: '', color: '#10B981' });
  };

  const handleRenameSection = (index: number) => {
    const newName = prompt("Enter new section name:", sections[index].name);
    if (newName) {
      const updatedSections = [...sections];
      updatedSections[index].name = newName;
      setSections(updatedSections);
    }
  };
  
  const handleDeleteSection = (index: number) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      const updatedSections = sections.filter((_, i) => i !== index);
      setSections(updatedSections);
      if (activeSectionIndex === index) {
        setActiveSectionIndex(0);
      } else if (activeSectionIndex > index) {
        setActiveSectionIndex(activeSectionIndex - 1);
      }
    }
  };
  

  const handleRenameCategory = (index: number) => {
    const newName = prompt("Enter new category name:", categories[index].name);
    if (newName) {
      const updatedCategories = [...categories];
      updatedCategories[index].name = newName;
      setCategories(updatedCategories);
    }
  };
  
  const handleResizeGrid = () => {
    const updatedSections = [...sections];
    const currentSeats = [...updatedSections[activeSectionIndex].seats];
    const newSeats = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => currentSeats[r]?.[c] ?? -1)
    );
    updatedSections[activeSectionIndex].seats = newSeats;
    setSections(updatedSections);
  };

  const handleDeleteCategory = (index: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      const updatedCategories = categories.filter((_, i) => i !== index);
      setCategories(updatedCategories);
  
      // Update seats that had this category
      const updatedSections = sections.map((section) => ({
        ...section,
        seats: section.seats.map((row) =>
          row.map((seat) => (seat === index ? -1 : seat > index ? seat - 1 : seat))
        ),
      }));
      setSections(updatedSections);
  
      // Update selectedCategoryIndex if necessary
      if (selectedCategoryIndex === index) {
        setSelectedCategoryIndex(null);
      } else if (selectedCategoryIndex && selectedCategoryIndex > index) {
        setSelectedCategoryIndex(selectedCategoryIndex - 1);
      }
    }
  };  

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;
    setSections([
      ...sections,
      {
        name: newSectionName,
        seats: Array.from({ length: rows }, () => Array(cols).fill(-1)),
      },
    ]);
    setNewSectionName('');
    setActiveSectionIndex(sections.length); // switch to new
  };

  const handleSeatClick = (r: number, c: number) => {
    if (selectedCategoryIndex === null) return;
    const updatedSections = [...sections];
    const currentSeats = [...updatedSections[activeSectionIndex].seats];
    currentSeats[r][c] =
      currentSeats[r][c] === selectedCategoryIndex ? -1 : selectedCategoryIndex;
    updatedSections[activeSectionIndex].seats = currentSeats;
    setSections(updatedSections);
  };

  const handleBatchAssign = () => {
    if (selectedCategoryIndex === null) return;

    const updatedSections = [...sections];
    const currentSeats = [...updatedSections[activeSectionIndex].seats];

    const rStart = Math.min(batchStart.row, batchEnd.row);
    const rEnd = Math.max(batchStart.row, batchEnd.row);
    const cStart = Math.min(batchStart.col, batchEnd.col);
    const cEnd = Math.max(batchStart.col, batchEnd.col);

    for (let r = rStart; r <= rEnd; r++) {
      for (let c = cStart; c <= cEnd; c++) {
        if (r < currentSeats.length && c < currentSeats[0].length) {
          currentSeats[r][c] = selectedCategoryIndex;
        }
      }
    }

    updatedSections[activeSectionIndex].seats = currentSeats;
    setSections(updatedSections);
  };

  if (!visible) return null;

  const activeSection = sections[activeSectionIndex];

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-6xl w-full space-y-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">🎟️ Arrange Seats</h2>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-red-500 font-bold">
            &times;
          </button>
        </div>

        <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Seat Categories</h3>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="color"
            value={newCategory.color}
            onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
            className="w-10 h-10 rounded-md border cursor-pointer"
          />
        </div>

        <button
          onClick={handleAddCategory}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-all shadow-sm"
        >
          Add Category
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {categories.map((cat, index) => (
          <div key={index} className="flex items-center gap-2 bg-white shadow-md rounded-full px-4 py-2 transition-all hover:shadow-lg">
            <button
              onClick={() => setSelectedCategoryIndex(index)}
              style={{ backgroundColor: cat.color }}
              className={`text-white px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                selectedCategoryIndex === index ? 'ring-2 ring-black' : ''
              }`}
            >
              {cat.name}
            </button>
            <button
              onClick={() => handleRenameCategory(index)}
              className="text-blue-600 text-xs font-medium hover:underline"
            >
              Rename
            </button>
            <button
              onClick={() => handleDeleteCategory(index)}
              className="text-red-600 text-xs font-medium hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">🎟️ Seat Sections</h3>

      <div className="flex flex-wrap gap-3 transition-all duration-300">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`group inline-flex items-center gap-2 px-5 py-2 rounded-full border cursor-pointer shadow-md transition-all duration-200 ${
              activeSectionIndex === idx
                ? 'bg-green-500 text-white border-green-500 scale-105'
                : 'bg-white text-gray-700 border-gray-300 hover:shadow-lg'
            }`}
            onClick={() => setActiveSectionIndex(idx)}
          >
            <span className="font-medium">{section.name}</span>
            <span className="hidden group-hover:flex gap-1 text-xs">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRenameSection(idx);
                }}
                className="text-blue-600 hover:underline"
              >
                Rename
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSection(idx);
                }}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="New Section Name"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          className="flex-grow min-w-[180px] px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
        />
        <input
          type="number"
          placeholder="Rows"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
        />
        <input
          type="number"
          placeholder="Cols"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
        />
        <button
          onClick={handleAddSection}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow"
        >
          + Add Section
        </button>
      </div>

      <hr className="my-6 border-t border-gray-200" />
      <h4 className="text-lg font-semibold text-gray-700">🪑 Seat Grid Preview</h4>
    </div>

    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">🎯 Batch Assign Category</h3>

      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow transition-all duration-300">
        <div className="flex items-center gap-2">
          <label className="text-gray-600 font-medium">Start</label>
          <input
            type="number"
            value={batchStart.row}
            onChange={(e) => setBatchStart({ ...batchStart, row: Number(e.target.value) })}
            className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Row"
          />
          <input
            type="number"
            value={batchStart.col}
            onChange={(e) => setBatchStart({ ...batchStart, col: Number(e.target.value) })}
            className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Col"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600 font-medium">End</label>
          <input
            type="number"
            value={batchEnd.row}
            onChange={(e) => setBatchEnd({ ...batchEnd, row: Number(e.target.value) })}
            className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Row"
          />
          <input
            type="number"
            value={batchEnd.col}
            onChange={(e) => setBatchEnd({ ...batchEnd, col: Number(e.target.value) })}
            className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Col"
          />
        </div>

        <button
          onClick={handleBatchAssign}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200 shadow"
        >
          Apply Category
        </button>
      </div>
    </div>

    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow transition-all duration-300">
      <div className="flex items-center gap-2">
        <label className="text-gray-600 font-medium">Rows</label>
        <input
          type="number"
          min={1}
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-600 font-medium">Cols</label>
        <input
          type="number"
          min={1}
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          className="w-20 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      <button
        onClick={handleResizeGrid}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg transition-all duration-200 shadow"
      >
        Resize Grid
      </button>
    </div>

    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">🪑 Seat Layout</h3>

      <div
        className="grid gap-2 auto-rows-[2.5rem] transition-all duration-300 ease-in-out"
        style={{
          gridTemplateColumns: `repeat(${activeSection.seats[0]?.length || 0}, 2.5rem)`,
        }}
      >
        {activeSection.seats.map((row, rIdx) =>
          row.map((seatIndex, cIdx) => {
            const isAssigned = seatIndex !== -1;
            const color = isAssigned ? categories[seatIndex]?.color : '#f3f4f6';
            const label = isAssigned ? categories[seatIndex]?.name[0].toUpperCase() : '';

            return (
              <div
                key={`${rIdx}-${cIdx}`}
                onClick={() => handleSeatClick(rIdx, cIdx)}
                className={`w-10 h-10 flex items-center justify-center border rounded-md cursor-pointer shadow-sm transform transition-all duration-300 hover:scale-110 hover:shadow-md ${
                  isAssigned ? 'text-white' : 'text-gray-500'
                }`}
                style={{
                  backgroundColor: color,
                  boxShadow: isAssigned
                    ? `0 0 0 2px ${color}, 0 2px 8px rgba(0,0,0,0.15)`
                    : undefined,
                }}
              >
                <span className="text-sm font-semibold">{label}</span>
              </div>
            );
          })
        )}
      </div>
    </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-sm">
            Close
          </button>
          <button
            onClick={() => {
              alert('Seating saved!');
              onClose();
            }}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
          >
            Save Seating
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatingArrangementModal;
