export const List = () => {
  const obj = {
    a: { d: {} },
    b: {},
    c: { e: { f: {} } },
  };
  const getList = (obj: Record<string, any>) => {
    const children = [];
    for (const [key, value] of Object.entries(obj)) {
      if (Object.keys(value).length === 0) {
        const li = <li key={key}>{key}</li>;
        children.push(li);
      } else {
        const li = (
          <li key={key}>
            {key}
            <ul>{getList(value)}</ul>
          </li>
        );
        children.push(li);
      }
    }
    //return Object.keys(obj).map(key => <li key={key}>{key}</li>)
    return children;
  };

  const ul = <ul>{getList(obj)}</ul>;

  return ul;
};
