var CharMap;
(function (CharMap) {
    function makeSingleChar(data) {
        var res = data;
        if (data.name === "<control>") {
            res.preview = "";
            res.text =  data.code.toString(16) + " - " + data.altName + "(control)";
        }
        else {
            res.preview = "&#x" + data.code.toString(16) + ";";
            res.text = data.code.toString(16) + " - " + data.name.replace("<", "&lt;").replace(">", "&gt;");
        }
        return res;
    }
    function getAllBlocks() {
        var res = [];

        for (var i=0; i<unicode.blocks.length; i++) {
            res.push({ block: unicode.blocks[i], chars: createBlock(i) });
        }
        return res;
    }
    function createBlock(blockIndex) {
        var block = window.unicode.blocks[blockIndex];
        if (!block)
            return [];
        // undone: block.name
        var data = [];
        // unicode.data has code points, but you can't assume that index==code due to gaps and unfilled parts
        // making unicode.data have all code points (including empty ones) would be pretty memory inneficient.
        //
        var index = 0;
        while (index < window.unicode.data.length - 1 && window.unicode.data[index].code < block.start) {
            index++;
        }
        for (var currentCode = block.start; currentCode <= block.end; currentCode++) {
            // <control> hack to filter out ugly items, for now... 
            //
            if (window.unicode.data[index].name !== "<control>") {
                if (window.unicode.data[index].code !== currentCode) {
                    // This just means there isn't an explicit entry in the data table, not neccessarily
                    // that there isn't a defined character (CJK unified ideographs, for example)
                    //
                    data.push({
                        code: currentCode,
                        name: "<not present>",
                        altName: "<not present>",
                        preview: "&#x" + currentCode.toString(16) + ";",
                        text: currentCode.toString(16) + " - &lt;not present&gt;"
                    });
                }
                else {
                    data.push(makeSingleChar(window.unicode.data[index]));
                }
            }

            while (index < window.unicode.data.length - 1 && window.unicode.data[index].code <= currentCode) {
                index++;
            }
        }
        return data;
    }

    CharMap.createBlock = createBlock;
    CharMap.getAllBlocks = getAllBlocks;
})(CharMap || (CharMap = {}));
