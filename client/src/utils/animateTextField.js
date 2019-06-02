export default () => {
  let nodes = document.getElementsByClassName("animated");
  for (let i = 0; i < nodes.length; ++i) {
    //animate progress bar
    nodes[i].addEventListener("focus", () => {
      //get class attribute

      let nodeName = nodes[i].getAttribute("name");
      nodeName += "-p";
      const elem = document.querySelector(`div[class~='${nodeName}']>div`);
      elem.setAttribute("style", "width:100%;");
    });

    nodes[i].addEventListener("blur", () => {
      //get class attribute

      let nodeName = nodes[i].getAttribute("name");
      nodeName += "-p";
      const elem = document.querySelector(`div[class~='${nodeName}']>div`);
      elem.setAttribute("style", "width:0%");
    });
  }
};
