import { of } from "rxjs"
import { ajax } from "rxjs/ajax"

const API_ENDPOINT = "http://localhost:5000"

export const getFiles = ({ rootFolder }) => {
  return ajax.get(`${API_ENDPOINT}/dir?root_dir=${rootFolder}`)
}
