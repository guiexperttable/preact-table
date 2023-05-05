import { Component, createRef } from "preact";
import {
  GeModelChangeEvent,
  GeMouseEvent,
  SimpleDomService,
  TableModelIf,
  TableOptions,
  TableScope
} from "@guiexpert/table";
import { GeCheckboxEventFn, GeModelChangeEventFn, GeMouseEventFn, GeTableReadyEventFn } from "@guiexpert/react-table";

export interface PreactTableProps {
  tableModel: TableModelIf,
  tableOptions?: TableOptions,
  mouseMoved?: GeMouseEventFn,
  contextmenu?: GeMouseEventFn,
  mouseClicked?: GeMouseEventFn,
  mouseDragging?: GeMouseEventFn,
  mouseDraggingEnd?: GeMouseEventFn,
  checkboxChanged?: GeCheckboxEventFn,
  modelChanged?: GeModelChangeEventFn,
  tableReady?: GeTableReadyEventFn
}


export class PreactTable extends Component {

  ref = createRef();

  constructor(props: PreactTableProps) {
    super(props);
  }

  componentDidMount() {
    let myContainer: HTMLDivElement = this.ref.current;
    console.info("myContainer", myContainer);
    this.initTable(myContainer, this.props as PreactTableProps);
  }

  componentWillUnmount() {
  }

  initTable(ele: HTMLDivElement, props: PreactTableProps) {
    const listener = {
      onCheckboxChanged: (evt: any[]) => {
        if (props.checkboxChanged) {
          props.checkboxChanged(evt);
        }
      },

      onContextmenu: (evt: GeMouseEvent) => {
        if (props.contextmenu) {
          props.contextmenu(evt);
        }
      },

      onModelChanged: (evt: GeModelChangeEvent) => {
        if (props.modelChanged) {
          props.modelChanged(evt);
        }
      },

      onMouseClicked: (evt: GeMouseEvent) => {
        if (props.mouseClicked) {
          props.mouseClicked(evt);
        }
      },

      onMouseDragging: (evt: GeMouseEvent) => {
        if (props.mouseDragging) {
          props.mouseDragging(evt);
        }
      },

      onMouseDraggingEnd: (evt: GeMouseEvent) => {
        if (props.mouseDraggingEnd) {
          props.mouseDraggingEnd(evt);
        }
      },

      onMouseMoved: (evt: GeMouseEvent) => {
        // if (mouseMoved) {
        //   mouseMoved(evt);
        // }
      }
    };

    const tableScope = new TableScope(
      ele, props.tableModel, new SimpleDomService(), props.tableOptions ?? new TableOptions(), listener
    );
    tableScope.firstInit();
    if (props.tableReady) {
      props.tableReady(tableScope.getApi());
    }
  };

  render() {
    return <div
      ref={this.ref}
      className="container-div"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        padding: "0",
        margin: "0"
      }} />;
  }
}

export default PreactTable;
