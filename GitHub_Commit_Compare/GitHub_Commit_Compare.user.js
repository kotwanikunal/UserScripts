// ==UserScript==
// @name        GitHub Commit Compare
// @namespace   https://github.com/jerone/UserScripts
// @description Add controls to compare commits.
// @author      jerone
// @contributor darkred
// @copyright   2017+, jerone (https://github.com/jerone)
// @license     CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode
// @license     GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @homepage    https://github.com/jerone/UserScripts/tree/master/GitHub_Commit_Compare
// @homepageURL https://github.com/jerone/UserScripts/tree/master/GitHub_Commit_Compare
// @downloadURL https://github.com/jerone/UserScripts/raw/master/GitHub_Commit_Compare/GitHub_Commit_Compare.user.js
// @updateURL   https://github.com/jerone/UserScripts/raw/master/GitHub_Commit_Compare/GitHub_Commit_Compare.user.js
// @supportURL  https://github.com/jerone/UserScripts/issues
// @contributionURL https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=VCYMHWQ7ZMBKW
// @icon        https://github.githubassets.com/pinned-octocat.svg
// @match     https://github.com/*/*/commits
// @match     https://github.com/*/*/commits/*
// @match     https://github.com/*/*/compare/*
// @exclude     https://github.com/*/*.diff
// @exclude     https://github.com/*/*.patch
// @version     0.0.3
// @grant       none
// ==/UserScript==
(function() {

    function addButton() {
        var nav;
        if ((nav = document.querySelector('.file-navigation'))) {

            // Check if our group of buttons are already attached.
            // Remove it, as the 'old' buttons don't have events anymore.
            const e = document.getElementById('GitHubCommitCompareGroup');
            if (e) {
                e.parentElement.removeChild(e);
            }
            Array.from(document.querySelectorAll('.GitHubCommitCompareButtonAB')).forEach(function(b) {
                b.parentElement.removeChild(b);
            });

            const c = document.createElement('input');
            c.type = 'checkbox';
            c.addEventListener('change',
                function() {
                    const bb = document.querySelectorAll('.GitHubCommitCompareButtonAB');
                    if (this.checked) {
                        if (bb.length === 0) {
                            addCompareButtons();
                        } else {
                            Array.from(bb).forEach(function(b) {
                                b.classList.remove('d-none');
                            });
                        }
                    } else {
                        Array.from(bb).forEach(function(b) {
                            b.classList.add('d-none');
                        });
                    }
                    const bbb = document.getElementById('GitHubCommitCompareButton');
                    if (bbb) bbb.classList.remove('disabled');
                });

            const l = document.createElement('label');
            l.classList.add('tooltipped', 'tooltipped-n');
            l.setAttribute('aria-label', 'Show commit compare buttons');
            l.style.cssText = `
        float: left;
        padding: 3px 10px;
        font-size: 12px;
        font-weight: 600;
        line-height: 20px;
        color: #24292e;
        vertical-align: middle;
        background-color: #fff;
        border: 1px solid rgba(27,31,35,0.2);
        border-right: 0;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      `;
            l.appendChild(c);

            const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            p.setAttributeNS(null,
                'd',
                'M5 12H4c-.27-.02-.48-.11-.69-.31-.21-.2-.3-.42-.31-.69V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V11c.03.78.34 1.47.94 2.06.6.59 1.28.91 2.06.94h1v2l3-3-3-3v2zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm11 9.48V5c-.03-.78-.34-1.47-.94-2.06-.6-.59-1.28-.91-2.06-.94H9V0L6 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 12 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z');

            const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            s.classList.add('octicon', 'octicon-diff');
            s.setAttributeNS(null, 'height', 16);
            s.setAttributeNS(null, 'width', 14);
            s.setAttributeNS(null, 'viewBox', '0 0 14 16');
            s.appendChild(p);

            const a = document.createElement('a');
            a.id = 'GitHubCommitCompareButton';
            a.classList.add('btn', 'btn-sm', 'tooltipped', 'tooltipped-n', 'disabled');
            a.setAttribute('href', '#');
            a.setAttribute('rel', 'nofollow');
            a.setAttribute('aria-label', 'Compare these commits');
            a.style.cssText = `
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      `;
            a.appendChild(s);
            a.appendChild(document.createElement("span"));

            const g = document.createElement('div');
            g.id = 'GitHubCommitCompareGroup';
            g.classList.add('float-right');
            g.appendChild(l);
            g.appendChild(a);

            nav.appendChild(g);
        } else if ((nav = document.querySelector('.range-editor'))) {
            const s = document.createElement("span");
            s.textContent = "Download MD Diff";

            const a = document.createElement('a');
            a.id = 'GitHubCompareDownloadButton';
            a.classList.add('btn', 'btn-sm', 'tooltipped', 'tooltipped-n');
            a.setAttribute('href', '#');
            a.setAttribute('rel', 'nofollow');
            a.setAttribute('aria-label', 'Download diff in metadata format');
            a.style.cssText = `
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      `;
            a.appendChild(s);
            a.setAttribute('href', '#');

            const g = document.createElement('div');
            g.id = 'GitHubCommitCompareGroup';
            g.classList.add('float-right');
            g.appendChild(a);

            nav.appendChild(g);

            document.getElementById('GitHubCompareDownloadButton').addEventListener("click", downloadDiff);
        }
    }

    function updateRadioButtons() {
        var compareAdisabled = true;
        var compareBdisabled = false;

        const compares = document.querySelectorAll('.GitHubCommitCompareButtonAB');
        Array.from(compares).forEach(function(compare) {
            const compareA = compare.querySelector('[name="GitHubCommitCompareButtonA"]');
            const compareB = compare.querySelector('[name="GitHubCommitCompareButtonB"]');

            compareA.disabled = compareAdisabled;
            compareA.parentNode.classList.toggle('disabled', compareAdisabled);

            if (compareA.checked) {
                compareBdisabled = true;
            }
            if (compareB.checked) {
                compareAdisabled = false;
            }

            compareB.disabled = compareBdisabled;
            compareB.parentNode.classList.toggle('disabled', compareBdisabled);
        });

        updateCompareButton();
    }

    function updateCompareButton() {
        const repo = document.querySelector('meta[property="og:url"]').content;

        const compareA = document.querySelector('.GitHubCommitCompareButtonAB [name="GitHubCommitCompareButtonA"]:checked');
        const hashA = compareA.parentNode.parentNode.parentNode.querySelector('clipboard-copy').value;
        const compareB = document.querySelector('.GitHubCommitCompareButtonAB [name="GitHubCommitCompareButtonB"]:checked');
        const hashB = compareB.parentNode.parentNode.parentNode.querySelector('clipboard-copy').value;

        const a = document.getElementById('GitHubCommitCompareButton');
        a.setAttribute('href', `${repo}/compare/${hashA}...${hashB}`);
        a.querySelector('span').textContent = ` ${hashA.substring(0, 7)}...${hashB.substring(0, 7)}`;

        //localStorage.setItem('GitHubCommitCompareButtonHashA', hashA);
        //localStorage.setItem('GitHubCommitCompareButtonHashB', hashB);
    }

    function addCompareButtons() {
        const commits = document.querySelectorAll('.js-commits-list-item .d-md-block');
        Array.from(commits).forEach(function(item, index) {
            const c1 = document.createElement('input');
            c1.name = 'GitHubCommitCompareButtonA';
            c1.type = 'radio';
            c1.addEventListener('change', updateRadioButtons);
            if (index === 1) c1.checked = true;

            const l1 = document.createElement('label');
            l1.classList.add('btn', 'btn-outline', 'BtnGroup-item', 'tooltipped', 'tooltipped-s');
            l1.setAttribute('aria-label', 'Choose a base commit');
            l1.appendChild(c1);

            const c2 = document.createElement('input');
            c2.name = 'GitHubCommitCompareButtonB';
            c2.type = 'radio';
            c2.addEventListener('change', updateRadioButtons);
            if (index === 0) c2.checked = true;

            const l2 = document.createElement('label');
            l2.classList.add('btn', 'btn-outline', 'BtnGroup-item', 'tooltipped', 'tooltipped-s');
            l2.setAttribute('aria-label', 'Choose a head commit');
            l2.appendChild(c2);

            const gg = document.createElement('div');
            gg.classList.add('GitHubCommitCompareButtonAB', 'commit-links-group', 'BtnGroup');
            gg.appendChild(l1);
            gg.appendChild(l2);

            if (item.querySelector('.muted-link')) { // Insert after number of comments button.
                item.insertBefore(gg, item.querySelector('.muted-link').nextSibling);
            } else {
                item.insertBefore(gg, item.firstChild);
            }
        });

        updateRadioButtons(); // Update radio buttons.
    }

    function downloadDiff() {
        let data = '### Breaking Changes\n### Features\n### Enhancements\n### Bug Fixes\n### Infrastructure\n### Documentation\n### Maintainence\n### Refactorting\n### Tests\n\n\n### Changelog\n';
        const commits = document.querySelectorAll('.mb-1');
        Array.from(commits).forEach(function(item, index) {
            const rawText = item.querySelector('.Link--primary').textContent;
            const items = item.querySelectorAll('.Link--primary');
            const lastItem = items[items.length - 1];

            if (lastItem.textContent.charAt(lastItem.textContent.length - 1) != ')') {
                const parsedTitle = rawText.substring(0, text.length - 1);
                const additional = item.parentNode.querySelector('.ws-pre-wrap');
                const additionalText = additional.textContent;
                const additionalTitle = additionalText.substring(1, otherText.indexOf('('));
                const issueLinks = additional.querySelectorAll('.issue-link');
                const issueLink = issueLinks[issueLinks.length - 1].href;
                const issueText = issueLinks[issueLinks.length - 1].textContent;
                data += '* ' + parsedTitle + additionalTitle + '([' + issueText + '](' + issueLink + "))\n";
            } else {
                const parsedTitle = text.substring(0, text.length - 1);
                const issueLink = item.querySelector('.issue-link').href;
                const issueText = item.querySelector('.issue-link').textContent;
                data += '* ' + parsedTitle + '([' + issueText + '](' + issueLink + "))\n";

            }

        });

        download('notes.md', data);

    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    // Init.
    addButton();

    // Pjax.
    document.addEventListener('pjax:end', addButton);

})();