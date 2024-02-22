/** @format */

import { Select } from "antd";

const AntdSelect = ({
  opstion,
  plesholder,
  showSearch = true,
  mode = "",
  allowClear = true,
}: any) => {
  const onSearch = (value: string) => {};
  return (
    <Select
      options={opstion}
      placeholder={plesholder}
      showSearch={showSearch}
      onSearch={onSearch}
      mode={mode}
      allowClear={allowClear}
    ></Select>
  );
};

export default AntdSelect;
