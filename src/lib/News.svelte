<script lang="ts">
    import DOMPurify from 'dompurify';

    export let title: string;
    export let content: string;
    export let date_add: string; 

    function parseContent() {
        if (content.includes("Патриотизм начинается")) {
            date_add = (Date.now() / 1000).toString();
            title = "Сообщение от разработчиков Эврики";
            return `Подпишитесь на наш телеграмм-канал чтобы следить за новыми обновлениями (<a class="text-blue-500 underline" href="https://t.me/acoeureka">тык</a>)<br>Наш Github: <a class="text-blue-500 underline" href="https://github.com/velikoss/eureka">тык</a>`;
        }

        // Sanitize the content to remove any potentially harmful HTML
        const sanitizedContent = DOMPurify.sanitize(content);

        // Create a temporary div element to manipulate the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sanitizedContent;

        // Remove all inline styles from elements
        const elementsWithStyle = tempDiv.querySelectorAll('[style]');
        elementsWithStyle.forEach(element => {
            element.removeAttribute('style');
        });

        // Remove any <style> tags
        const styleTags = tempDiv.querySelectorAll('style');
        styleTags.forEach(styleTag => {
            styleTag.remove();
        });

        // Function to wrap URLs in <a> tags
        const wrapUrlsInText = (text: string) => {
            const urlRegex = /https:\/\/[^\s]+/g; // Global flag to match all occurrences
            return text.replace(urlRegex, (url) => `<a class="text-blue-500 underline" href="${url}" target="_blank">${url}</a>`);
        };

        // Traverse all text nodes and wrap URLs
        const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null);
        const nodesToReplace: { node: Node, replacement: HTMLElement }[] = [];

        // First, collect all text nodes that need to be replaced
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (node.nodeType === Node.TEXT_NODE && node.textContent?.includes("https://")) {
                const wrappedText = wrapUrlsInText(node.textContent);
                const newNode = document.createElement('span');
                newNode.innerHTML = wrappedText;
                nodesToReplace.push({ node, replacement: newNode });
            }
        }

        // Replace the text nodes with the new <span> elements
        nodesToReplace.forEach(({ node, replacement }) => {
            node.parentNode?.replaceChild(replacement, node);
        });

        // Return the cleaned HTML
        return tempDiv.innerHTML;
    }
</script>

<div class="border w-full mb-2.5 p-1">
    <div class="flex flex-row justify-between">
        <p class="font-bold text-xl mb-1">{title}</p>
        <p class="font-bold text-xl mb-1 right-0 text-right place-self-end">{new Date(parseInt(date_add) * 1000).toDateString()}</p>
    </div>
    {@html parseContent()}
</div>