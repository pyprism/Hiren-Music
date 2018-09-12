export default function sidebarCollapse() {
    const $ = window.$;
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
}