function unicodeMapViewModel() {
    //Data
    var self = this;
    var Block = function (name, id) {
        this.blockName = name;
        this.blockId = id;
    };

    self.availableBlocks = ko.observableArray([
                    new Block('Block 1', 0),
                    new Block('Block 2', 1),
                    new Block('Block 3', 2),
                    new Block('Block 4', 3),
                    new Block('Block 5', 4)
    ]);
    self.status = ko.observable('Idle');
    self.chosenBlockId = ko.observable();
    self.chosenBlockData = ko.observableArray([{ code: 1, name: '<not present>', altName: '<not present>', preview: '', text: 'haha' }]);
    self.chosenBlockCompute = ko.computed(function () {
        
        window.setTimeout(function () {
            console.log('Removing');
            self.chosenBlockData.removeAll();
            console.log('Creating');
            var blockData = CharMap.createBlock(self.chosenBlockId());
            console.log('Pushing');
            self.chosenBlockData.push.apply(self.chosenBlockData, blockData);
            console.log('Pushing Done');
            self.status('Idle');
        }, 2000);
        self.status('Task set');
        //console.log(self.chosenBlockData());
        return self.chosenBlockId();
    });
    self.favorites = ko.observableArray([]);

    //Behaviours
    self.favoriteClicked = function () {
        //viewModel.listViewArray.removeAll();
       // viewModel.listViewArray.push.apply(viewModel.listViewArray, viewModel.favorites());
    };

    self.listClicked = function () {
        //var blockSelect = document.getElementById('blockSelect'),
       // blockIndex = +blockSelect.value;
        //viewModel.listViewArray.removeAll();
       // viewModel.listViewArray.push.apply(viewModel.listViewArray, CharMap.createBlock(blockIndex));
    };

    
};