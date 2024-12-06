import React, { useState } from "react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi";

type Category = {
  id: number;
  name: string;
  children: Category[];
};

const Tree = ({ list }: { list: Category[] }) => {
  return (
    <ul className="space-y-2 max-w-md mx-auto">
      {list.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

const TreeNode = ({ node }: { node: Category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-12 px-4 bg-blue-100 rounded-lg shadow-md hover:bg-blue-200 transition duration-200"
        style={{ minWidth: "200px" }} // Ensures a standard size
      >
        <span className="flex items-center gap-2 text-base font-medium text-blue-700">
          {node.children.length > 0 &&
            (isOpen ? (
              <HiChevronDown className="w-5 h-5" />
            ) : (
              <HiChevronRight className="w-5 h-5" />
            ))}
          {node.name}
        </span>
      </button>
      {isOpen && node.children.length > 0 && (
        <ul className="ml-6 mt-2 border-l-2 border-blue-300 pl-4">
          <Tree list={node.children} />
        </ul>
      )}
    </li>
  );
};

export default Tree;
