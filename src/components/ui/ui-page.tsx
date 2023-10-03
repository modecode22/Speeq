import { Button } from "./button";
import { Input } from "./input";
import { PasswordInput } from "./password-input";
import { Switch } from "./switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";
import { Textarea } from "./textarea";
import Tooltip from "./tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";

const UiPage = () => {
  return (
    <section className="flex flex-col gap-20 p-5">
      <section className="flex flex-col gap-5 items-center">
        <h1 className="w-full text-primary-500">Buttons :</h1>
      <Tooltip name="transparent button" direction="bottom">

        <Button variant={"transparent"}>transparent</Button>

      </Tooltip>
        <div className="flex gap-5">
          <Button variant={"primary-solid"}>primary-solid</Button>
          <Button variant={"primary-outline"}>primary-outline</Button>
          <Button variant={"primary-ghost"}>primary-ghost</Button>
        </div>
        <div className="flex gap-5">
          <Button variant={"dark-solid"}>dark-solid</Button>
          <Button variant={"dark-outline"}>dark-outline</Button>
          <Button variant={"dark-ghost"}>dark-ghost</Button>{" "}
        </div>
        <div className="flex gap-5">
          <Button variant={"light-solid"}>light-solid</Button>
          <Button variant={"light-outline"}>light-outline</Button>
          <Button variant={"light-ghost"}>light-ghost</Button>{" "}
        </div>
        <div className="flex gap-5">
          <Button variant={"alert-solid"}>alert-solid</Button>
          <Button variant={"alert-outline"}>alert-outline</Button>
          <Button variant={"alert-ghost"}>alert-ghost</Button>{" "}
        </div>
        <div className="flex gap-5">
          <Button variant={"error-solid"}>error-solid</Button>
          <Button variant={"error-outline"}>error-outline</Button>
          <Button variant={"error-ghost"}>error-ghost</Button>
        </div>
        <div className="flex gap-5">
          <Button variant={"happy-solid"}>happy-solid</Button>{" "}
          <Button variant={"happy-outline"}>happy-outline</Button>
          <Button variant={"happy-ghost"}>happy-ghost</Button>{" "}
        </div>
        <div className="flex gap-5">
          <Button variant={"info-solid"}>info-solid</Button>{" "}
          <Button variant={"info-outline"}>info-outline</Button>
          <Button variant={"info-ghost"}>info-ghost</Button>
        </div>
        <div className="flex gap-5">
          <Button variant={"success-solid"}>success-solid</Button>{" "}
          <Button variant={"success-outline"}>success-outline</Button>
          <Button variant={"success-ghost"}>success-ghost</Button>
        </div>
      </section>
      <section className="flex flex-col gap-5 items-center">
        <h1 className="w-full text-primary-500">Inputs :</h1>
        <div className="flex gap-5 w-full justify-center items-center">
<Input placeholder='normal input' />
<PasswordInput name="password" placeholder='password input' />
<Switch />
        </div>
<div className="flex gap-5 w-full ">

<Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Textarea placeholder="text area" />

</div>
      </section>

      <section>
      <div className="">
<h1 className="w-full text-primary-500">Typography :</h1>

      <h1>H1: The quick brown fox</h1>
      <h2>H2: The quick brown fox</h2>
      <h3>H3: The quick brown fox</h3>
      <h4>H4: The quick brown fox</h4>
      <h5>H5: The quick brown fox</h5>
      <h6>H6: The quick brown fox</h6>

      <p>
        Paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
        Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
      </p>

      <ul>
        <li>Unordered List Item 1</li>
        <li>Unordered List Item 2</li>
        <li>Unordered List Item 3</li>
      </ul>

      <ol>
        <li>Ordered List Item 1</li>
        <li>Ordered List Item 2</li>
        <li>Ordered List Item 3</li>
      </ol>

      <a href="#example-link">This is a link</a>
    </div>
      </section>
      <section>


<section className="flex gap-5">
  
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary-solid">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              placeholder="demo place holder"
              className="col-span-3 rounded w-full"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3  rounded w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Sheet   >
  <SheetTrigger>
Open Menu

  </SheetTrigger>
  <SheetContent side={"right"} className="bg-white" >
    <SheetHeader>
      <SheetTitle>Are you sure absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  
  
  
  </section>        

      </section>
    </section>
  );
};

export default UiPage;
