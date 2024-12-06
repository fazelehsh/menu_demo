import React, { useState } from "react";
import { HiChevronLeft, HiChevronDown } from "react-icons/hi";

type Category = {
  id: number;
  name: string;
  children: Category[];
};

const Tree = ({ list }: { list: Category[] }) => {
  return (
    <ul className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-4 border border-gray-200" dir="rtl">
      {list.map((node) => (
        <TreeNode key={node.id} node={node} level={0} />
      ))}
    </ul>
  );
};

const TreeNode = ({ node, level }: { node: Category; level: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <div
        className={`flex items-center cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-200 margin-right-${level}`}
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
          <span className="text-sm font-medium text-gray-800">{node.name}</span>
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
