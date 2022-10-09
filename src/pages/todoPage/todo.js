import React, { useState } from "react";
import { Input, Button } from "../../components";
import { addTodo, deleteTodo } from "../../actions/todoAction";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "../../constants/constants";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const list = useSelector((state) => state?.todoList?.list);

  const dispatch = useDispatch();

  const { addItems, buttons } = constants?.todoPage || {};
  const { addLabel, deleteLabel, editLabel } = buttons || {};

  const InlineEdit = (value) => {
    let newData = list.find((element) => {
      return element?.id === value?.id;
    });
    setToggleSubmit(false);
    setInputData(newData?.data);
    setIsEditItem(value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder={addItems}
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      {toggleSubmit ? (
        <Button
          label={addLabel}
          onClick={() => dispatch(addTodo(inputData), setInputData(""))}
        />
      ) : (
        <Button
          label="update"
          variant="success"
          //   onClick={() => InlineEdit(value)}
        />
      )}

      {list &&
        list?.length > 0 &&
        list.map((value, index) => {
          return (
            <>
              <div key={index}>{value?.data}</div>
              <Button
                label={editLabel}
                variant="success"
                onClick={() => InlineEdit(value)}
              />
              <Button
                label={deleteLabel}
                variant="danger"
                onClick={() => dispatch(deleteTodo(value.id))}
              />
            </>
          );
        })}
    </div>
  );
};

export default Todo;
