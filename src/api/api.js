import axios from "./axios"

const api = {
    async getOrganizations() {
        return await axios.get(`/organizations/`)
    },
    async getOrganizationBoards(organizationSlug) {
        return await axios.get(`/organizations/${organizationSlug}/boards/`)
    },
    async getBoardHistory(boardSlug) {
        return await axios.get(`/boards/${boardSlug}/history/`)
    }
}

export default api;