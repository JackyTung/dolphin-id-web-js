import { ajax } from "rxjs/ajax"
import { API_ENDPOINT } from "v2/constant"

export const getFiles = ({ rootFolder }) => {
  return ajax.get(`${API_ENDPOINT}/dir?root_dir=${rootFolder}`)
}
