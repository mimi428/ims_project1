import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  imports:[CommonModule],
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent {
  @Input() node: any;
  @Input() expandedNodes: Set<string> = new Set();

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
