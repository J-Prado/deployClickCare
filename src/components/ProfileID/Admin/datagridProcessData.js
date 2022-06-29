// ingresa un resp.payload sale objeto para datagrid MUI
export function objForDataGrid(payload) {
  const obj = {
    data: payload,
    columns: "",
  };
  const col = Object.getOwnPropertyNames(obj.data[0]);
  obj.columns = col.map((x) => ({ field: x, minWidth: 150 })); //, minWidth: 110, flex: 1 
  return obj;
}

