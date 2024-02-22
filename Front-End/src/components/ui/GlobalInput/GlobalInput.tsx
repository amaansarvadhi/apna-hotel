/** @format */

import { forwardRef, ChangeEvent } from "react";
import { HiOutlineSearch } from "react-icons/hi";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputGroup from "@/components/ui/InputGroup";

type CompanyTableSearchProps = {
  onInputChange: (value: string) => void;
  value?: any;
};

const GlobalInput = forwardRef<HTMLInputElement, CompanyTableSearchProps>(
  (props, ref) => {
    const { onInputChange, value } = props;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const searchKeyWord = e.target.value;
      const trimmedValue = searchKeyWord.replace(/^\s+/, "");
      onInputChange?.(trimmedValue);
    };

    return (
      <InputGroup>
        <Input
          ref={ref}
          size="sm"
          style={{ height: "36px" }}
          placeholder="Search"
          value={value}
          onChange={handleInputChange}
        />
        <Button size="sm" icon={<HiOutlineSearch className="text-xl w-20" />} />
      </InputGroup>
    );
  },
);

GlobalInput.displayName = "GlobalInput";

export default GlobalInput;
