import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@material-ui/core";
import editImage from "../../imgs/edit.png";
import deleteImage from "../../imgs/delete.png";
import "./List.scss"

const List = ({ records }) => {
  const headTable = ["Имя", "Врач", "Дата", "Жалобы"];
  console.log(records);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="tableHead">
            <TableRow>
              {headTable.map((element, index) => (
                <TableCell key={`key-${index}`}>{element}</TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((datas, index) => (
              <TableRow key={index}>
                <TableCell>{datas.name}</TableCell>
                <TableCell>{datas.doctor}</TableCell>
                <TableCell>{datas.date}</TableCell>
                <TableCell>{datas.complaints}</TableCell>
                <TableCell>
                  <img alt="" src={deleteImage} />
                </TableCell>
                <TableCell className="edit-table" align="center">
                  <img alt="" src={editImage} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;
