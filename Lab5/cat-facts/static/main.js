'use strict'

function createPageBtn(page, classes = []) {
    let btn = document.createElement('button');
    classes.push('btn');
    for (let cls of classes) {
        btn.classList.add(cls);
    }
    btn.dataset.page = page;
    btn.innerHTML = page;
    return btn;
}

function renderPaginationElement(info) {
    let btn;
    let paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = '';

    btn = createPageBtn(1, ['first-page-btn']);
    btn.innerHTML = 'Первая страница';
    if (info.current_page == 1) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);

    let buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('pages-btns');
    paginationContainer.append(buttonsContainer);

    let start = Math.max(info.current_page - 2, 1);
    let end = Math.min(info.current_page + 2, info.total_pages);
    for (let i = start; i <= end; i++) {
        buttonsContainer.append(createPageBtn(i, i == info.current_page ? ['active'] : []));
    }

    btn = createPageBtn(info.total_pages, ['last-page-btn']);
    btn.innerHTML = 'Последняя страница';
    if (info.current_page == info.total_pages) {
        btn.style.visibility = 'hidden';
    }
    paginationContainer.append(btn);
}

function perPageBtnHandler(event) {
    downloadData(1, document.querySelector('.search-field').value);
}

function setPaginationInfo(info) {
    document.querySelector('.total-count').innerHTML = info.total_count;
    let start = info.total_count > 0 ? (info.current_page - 1) * info.per_page + 1 : 0;
    document.querySelector('.current-interval-start').innerHTML = start;
    let end = Math.min(info.total_count, start + info.per_page - 1)
    document.querySelector('.current-interval-end').innerHTML = end;
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        downloadData(event.target.dataset.page, document.querySelector('.search-field').value);
        window.scrollTo(0, 0);
    }
}

function createAuthorElement(record) {
    let user = record.user || { 'name': { 'first': '', 'last': '' } };
    let authorElement = document.createElement('div');
    authorElement.classList.add('author-name');
    authorElement.innerHTML = user.name.first + ' ' + user.name.last;
    return authorElement;
}

function createUpvotesElement(record) {
    let upvotesElement = document.createElement('div');
    upvotesElement.classList.add('upvotes');
    upvotesElement.innerHTML = record.upvotes;
    return upvotesElement;
}

function createFooterElement(record) {
    let footerElement = document.createElement('div');
    footerElement.classList.add('item-footer');
    footerElement.append(createAuthorElement(record));
    footerElement.append(createUpvotesElement(record));
    return footerElement;
}

function createContentElement(record) {
    let contentElement = document.createElement('div');
    contentElement.classList.add('item-content');
    contentElement.innerHTML = record.text;
    return contentElement;
}

function createListItemElement(record) {
    let itemElement = document.createElement('div');
    itemElement.classList.add('facts-list-item');
    itemElement.append(createContentElement(record));
    itemElement.append(createFooterElement(record));
    return itemElement;
}

function renderRecords(records) {
    let factsList = document.querySelector('.facts-list');
    factsList.innerHTML = '';
    for (let i = 0; i < records.length; i++) {
        factsList.append(createListItemElement(records[i]));
    }
}

function downloadAcpData(str) {
    let url = new URL('http://cat-facts-api.std-900.ist.mospolytech.ru/autocomplete');
    url.searchParams.append('q', str);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        createAcpElement(this.response)
    }
    xhr.send();
}

function createAcpElement(array) {
    removeAcpElement();
    let acpList = document.createElement('div');
    acpList.setAttribute('class', 'acp-list');
    document.querySelector('.autocomplete').append(acpList);

    for (let i = 0; i < array.length; i++) {
        let listItem = document.createElement('div');
        listItem.setAttribute('class', 'acp-list-item')
        listItem.innerHTML = array[i];
        listItem.onclick = acpListItemHandler;
        acpList.append(listItem);
    }
}

function removeAcpElement() {
    if (document.querySelector('.acp-list')) {
        document.querySelector('.autocomplete').removeChild(document.querySelector('.acp-list'));
    }
}

function searchFieldHadler(event) {
    console.log('qqqqq');
    downloadAcpData(event.target.value)
}

function acpListItemHandler(event) {
    document.querySelector('.search-field').value = event.target.innerHTML;
    removeAcpElement();
}

function searchBtnHandler(event) {
    let q = document.querySelector('.search-field').value;
    downloadData(1, q);
}

function downloadData(page = 1, q = '') {
    let factsList = document.querySelector('.facts-list');
    let url = new URL(factsList.dataset.url);
    let perPage = document.querySelector('.per-page-btn').value;
    url.searchParams.append('page', page);
    url.searchParams.append('per-page', perPage);
    if (q) url.searchParams.append('q', q);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = function () {
        renderRecords(this.response.records);
        setPaginationInfo(this.response['_pagination']);
        renderPaginationElement(this.response['_pagination']);
    }
    xhr.send();
}

window.onload = function () {
    downloadData(1, '');
    document.querySelector('.pagination').onclick = pageBtnHandler;
    document.querySelector('.per-page-btn').onchange = perPageBtnHandler;
    document.querySelector('.search-field').oninput = searchFieldHadler;
    document.querySelector('.search-btn').onclick = searchBtnHandler;
    document.onclick = removeAcpElement;
}