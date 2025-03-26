import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tree',
  imports:[CommonModule],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent {
  // Tree data
  treeData = [
    {
      name: 'PRODUCT',
      children: [
        { name: 'Saman' ,
          children: [
          { name: 'Sub-sub-product 1' },
          { name: 'Sub-sub-product 2' }
        ]},
        { name: 'Saman1' },
        { name: 'Saman2' },
        { name: 'Saman4' }
      ]
    }
  ];

  // To keep track of expanded nodes
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
