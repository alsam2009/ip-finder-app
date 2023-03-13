export function validateIp(ip) {
  if (/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)$/.test(ip)) {
    return true
  }
  alert("IP address is not valid!")
  return false
}