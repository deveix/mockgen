interface PatternProps {
  color?: string
  opacity?: number
}

function grid({ color = "black", opacity = 0.5 }: PatternProps) {
  return (
    "data:image/svg+xml;base64," +
    btoa(`<svg
xmlns="http://www.w3.org/2000/svg"
width="96"
height="96"
viewBox="0 0 96 96"
>
<g fill="none" opacity="${opacity}">
  <path d="M96 95.5001L0 95.5001" stroke="${color}"></path>
  <path d="M95.5 0V96" stroke="${color}"></path>
</g>
</svg>
`)
  )
}

function graphPaper({ color = "black", opacity = 0.5 }: PatternProps) {
  return (
    "data:image/svg+xml;base64," +
    btoa(`<svg
xmlns="http://www.w3.org/2000/svg"
width="100"
height="100"
viewBox="0 0 100 100"
>
<g fill-rule="evenodd" fill="${color}" fill-opacity="${opacity}">
  <g>
    <path
      opacity=".5"
      d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"
    />
    <path d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z" />
  </g>
</g>
</svg>
`)
  )
}

function dots({ color = "black", opacity = 0.5 }: PatternProps) {
  return (
    "data:image/svg+xml;base64," +
    btoa(`<svg
  width="20px"
  height="20px"
  viewBox="0 0 20 20"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs></defs>
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="dots" fill="${color}" fill-opacity="${opacity}">
      <circle id="Oval-377-Copy-9" cx="3" cy="3" r="3"></circle>
      <circle id="Oval-377-Copy-14" cx="13" cy="13" r="3"></circle>
    </g>
  </g>
</svg>    
`)
  )
}

export const patterns = {
  grid: {
    svg: grid,
    label: "Grid",
  },
  "graph-paper": {
    svg: graphPaper,
    label: "Graph Paper",
  },
  dots: {
    svg: dots,
    label: "Dots",
  },
}
