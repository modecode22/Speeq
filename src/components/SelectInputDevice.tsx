import { useEffect, useState } from "react";
import { useSettings } from "./SettingsProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const SelectInputDevice = () => {
    const { inputDevice,devices, updateInputDevice } = useSettings();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
  return (
    <Select
    onValueChange={(value: string) => {
        updateInputDevice(value);
    }}
    defaultValue={inputDevice}
  >
    <SelectTrigger name="input device" className="w-full">
      <SelectValue placeholder="Select Device" />
    </SelectTrigger>
    <SelectContent
      onSelect={(e) => {
        e.target;
      }}
      className="max-h-[300px] "
    >
        {devices.map((device) => {
          return (
            <SelectItem key={device.deviceId} value={device.deviceId}>
              {device.label}
            </SelectItem>
          );
        })}
    </SelectContent>
  </Select>  )
}


export default SelectInputDevice