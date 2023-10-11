import { useEffect, useState } from "react";
import { useSettings } from "./SettingsProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
const SelectOutputDevice = () => {
  const { outputDevice, devices, updateOutputDevice } = useSettings();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Select
      onValueChange={(value: string) => {
        updateOutputDevice(value);
      }}
      defaultValue={outputDevice}
    >
      <SelectTrigger name="output device" className="w-full">
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
    </Select>
  );
};

export default SelectOutputDevice;
