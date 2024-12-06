import React, { useState } from 'react';



type Category = {
  id: number; 
  name: string;
  children: Category[]; 
};


const Tree = ({ list } : { list: Category[] } ) => {
  return (
    <ul>
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
      <button onClick={() => setIsOpen(!isOpen)}>
        {node.name}
      </button>
      {isOpen && node.children.length > 0 && (
        <Tree list={node.children} />
      )}
    </li>
  );
};


export default Tree