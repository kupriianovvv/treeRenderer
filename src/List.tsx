import { useState } from "react";

type TBooleanCarcase = Record<string, boolean>
type TList = Record<string, Record<string, any>>

export const List = () => {
  const obj = {
    a: { d: {} },
    b: {},
    c: { z: { f: {} }, x: {}, l: {} },
  };
  const createBooleanCarcase = (
    obj: TList,
    BooleanCarcase: TBooleanCarcase = {}
  ) => {
    for (const [key, value] of Object.entries(obj)) {
      BooleanCarcase[key] = false;
      if (Object.keys(value).length !== 0) {
        createBooleanCarcase(value, BooleanCarcase);
      }
    }
    return BooleanCarcase;
  };

  const [list, setList] = useState(obj);
  const [carcase, setCarcase] = useState<TBooleanCarcase>(createBooleanCarcase(list));


  const onClick2 = (name: string, e: React.MouseEvent) => {
    console.log("click");
    console.log(name);
    setCarcase((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const getList = (obj: Record<string, any>) => {
    const children = [];
    for (const [key, value] of Object.entries(obj)) {
      if (Object.keys(value).length === 0) {
        const li = (
          <li key={key}>
            <span onClick={(e) => onClick2(key, e)}>{key}</span>
          </li>
        );
        children.push(li);
      } else {
        const li = (
          <li key={key}>
            <span onClick={(e) => onClick2(key, e)}>{key}</span>
            <ul hidden={carcase[key]}>{getList(value)}</ul>
          </li>
        );
        children.push(li);
      }
    }
    //return Object.keys(obj).map(key => <li key={key}>{key}</li>)
    return children;
  };

  const ul = <ul>{getList(obj)}</ul>;

  return <>{ul}</>;
};
