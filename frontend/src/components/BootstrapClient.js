"use client"

import { useEffect } from "react"

function BootstrapClient() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap');
  }, [])
  return null
}

export default BootstrapClient