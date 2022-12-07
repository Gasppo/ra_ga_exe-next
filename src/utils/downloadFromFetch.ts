export const downloadFromFetch = async (url: string, filename: string) => {
    const response = await fetch(url).then(res => res.json());
    const link = document.createElement('a');
    link.href = response.file;
    link.download = filename;
    link.click();
}