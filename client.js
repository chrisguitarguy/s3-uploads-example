(function (exports) {
    function createPresignedUrl() {
        return fetch('/presign', {method: 'POST'}).then(r => r.json());
    }

    function uploadFile(url, file) {
        return fetch(url, {
            method: 'PUT',
            body: file,
        }).then(resp => {
            return resp.text().then(body => {
                if (!resp.ok) {
                    return Promise.reject({
                        status: resp.status,
                        body,
                    });
                }

                return {
                    status: resp.status,
                    body,
                };
            });
        });
    }

    exports.onSubmit = function onSubmit(form) {
        if (form.file.files.length < 1) {
            alert('select a file please');
            return false;
        }


        var file = form.file.files[0]

        createPresignedUrl().then(res => {
            // upload the file first
            return uploadFile(res.url, file).then(() => res.filename);
        }).then(filename => {
            // now we know the filename of what got uploaded, send that
            // to the form in place of the actual file
            return fetch('/submit', {
                method: 'POST',
                body: JSON.stringify({filename}),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(() => {
                alert(`Hooray you uploaded ${filename}`);
                form.reset();
            });
        });

        return false;
    }
}(window));
