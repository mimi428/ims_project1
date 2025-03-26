import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TreeNodeComponent } from "../tree-node/tree-node.component";

@Component({
  selector: 'app-tree',
  imports: [CommonModule, TreeNodeComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  // Updated tree data with sub-products having children
  treeData = [
    {
      name: 'Products',
      children: [
        {
          name: 'Bottle',
          children: [
            { name: 'Plastic', children: [] },
            { name: 'Thermos', children: [] }
          ]
        },
        {
          name: 'Shoes',
          children: [
            { name: 'Flipflops', children: [] },
            { name: 'Sneakers', children: [] }
          ]
        }
      ]
    },
    {
      name: 'Product 2',
      children: [
        {
          name: 'idk',
          children: [
            { name: 'amcbw', children: [] },
            { name: 'vhbe', children: [] }
          ]
        },
      ]
    }
  ];

  expandedNodes: Set<string> = new Set();

  toggleNode(nodeName: string): void {
    if (this.expandedNodes.has(nodeName)) {
      this.expandedNodes.delete(nodeName);
    } else {
      this.expandedNodes.add(nodeName);
    }
  }

  isNodeExpanded(nodeName: string): boolean {
    return this.expandedNodes.has(nodeName);
  }
}
