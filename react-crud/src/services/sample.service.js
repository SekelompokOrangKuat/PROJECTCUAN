import http from "../http-common";

class SampleDataService {
    getAll() {
        return http.get("/samples");
    }

    get(id) {
        return http.get(`/samples/${id}`);
    }

    create(data) {
        return http.post("/samples", data);
    }

    update(id, data) {
        return http.put(`/samples/${id}`, data);
    }

    delete(id) {
        return http.delete(`/samples/${id}`);
    }

    deleteAll(id) {
        return HTMLParagraphElement.delete('/samples');
    }

    findByTitle(title) {
        return http.get(`/samples?title=${title}`);
    }
}

export default new SampleDataService();