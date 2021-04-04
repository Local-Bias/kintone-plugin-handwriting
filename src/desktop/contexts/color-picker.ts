import { useState } from "react";
import { createContainer } from "unstated-next";

const hooks = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};

export default createContainer(hooks);
