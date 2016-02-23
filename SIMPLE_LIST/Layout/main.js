(function mainElement() {

    "use strict";

    $(window).ready(function windowReady() {

        //Application not configured
        if (!window.conf.searchName) {
            $(".notConfigurated").show();
            $(".mainWrapper").hide();
            return;
        }

        var escapeHTML = function escapeHTML(text) {
            return $('<div/>').text(text).html();
        }, $documentWrapper = $(".documentWrapper"),
            $listPartElements = $(".listPart__elements");

        $documentWrapper.document();

        $documentWrapper.document("addEventListener", "ready", function documentReady(event, currentDoc) {
            console.log("selected", currentDoc);
            $listPartElements.find(".documentElement").removeClass("active");
            $listPartElements.find('[data-initid='+currentDoc.initid+']').addClass("active").text(currentDoc.title);
        });

        $documentWrapper.document("addEventListener", "afterDelete", function documentReady(event, currentDoc) {
            console.log("removed", currentDoc);
            $listPartElements.find(".documentElement").removeClass("active");
            $listPartElements.find('[data-initid='+currentDoc.initid+']').remove();
            $documentWrapper.hide();
        });

        $.get("api/v1/searches/"+window.encodeURIComponent(window.conf.searchName)+"/documents/").always(function initList(response) {
            var i, listElements = "", documents, currentDocument;
            if (!response.success || !response.data || !response.data.documents || !$.isArray(response.data.documents)) {
                alert("Unable to init the list ! Please reload the page");
                return;
            }
            documents = response.data.documents;
            for(i = 0; i < documents.length; i++) {
                currentDocument = documents[i];
                listElements += '<a class="documentElement list-group-item" href="?app=DOCUMENT&id='+
                    window.encodeURIComponent(currentDocument.properties.initid)+
                    '" data-initid="'+currentDocument.properties.initid+'">' + escapeHTML(currentDocument.properties.title)+'</a>';
            }

            $listPartElements.empty().append(listElements);

        });

        $listPartElements.on("click", ".documentElement", function clickOnDocument(event) {
            event.preventDefault();
            $documentWrapper.show().trigger("resize");
            $documentWrapper.document("fetchDocument", {
                "initid" : $(this).data("initid")
            });
        });
    });

})();