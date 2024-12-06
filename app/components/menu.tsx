import React, { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronDown, HiSearch } from "react-icons/hi";

type Category = {
  id: number;
  name: string;
  children: Category[];
};

const Tree = ({ list }: { list: Category[] }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(list);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredCategories(list);
    } else {
      const searchInCategories = (categories: Category[]): Category[] => {
        return categories
          .filter((category) =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((category) => ({
            ...category,
            children: searchInCategories(category.children),
          }));
      };
      setFilteredCategories(searchInCategories(list));
    }
  }, [searchQuery, list]);

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4 border border-gray-200" dir="rtl">
      {/* جعبه جستجو */}
      <div className="flex items-center mb-4 border border-gray-300 rounded-lg p-2">
        <HiSearch className="text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="جستجو در دسته‌بندی‌ها..."
          className="ml-2 w-full p-1 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* نمایش دسته‌بندی‌های فیلتر شده */}
      <ul>
        {filteredCategories.map((node) => (
          <TreeNode key={node.id} node={node} level={0} />
        ))}
      </ul>
    </div>
  );
};

const TreeNode = ({ node, level }: { node: Category; level: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <div
        className={`flex items-center cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-200 ml-${level * 4}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          {node.children.length > 0 ? (
            isOpen ? (
              <HiChevronDown className="text-gray-500 w-4 h-4" />
            ) : (
              <HiChevronLeft className="text-gray-500 w-4 h-4" />
            )
          ) : (
            <div className="w-4 h-4"></div>
          )}
          <span className="text-sm font-medium text-gray-800">
            <span dir="ltr">{node.name}</span>
          </span>
        </div>
      </div>
      {isOpen && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Tree;
