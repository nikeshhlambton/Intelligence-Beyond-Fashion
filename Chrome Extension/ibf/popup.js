/* 
File name: popup.js
Javascript to handle popup ui

@author Intelligence Beyond Fashion - Lambton college team
*/

let scrape = document.getElementById('scrape');
let scrapeAmazonData = document.getElementById('scrapeAmazonData');
let amazonData = document.getElementById('amazonData');
let products = document.getElementById('products');

// A utility function to create HTML
function getHtml(template) {
    return template.join('\n');
}

// Handler to list the products
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let image = request.image;
    let title = request.title;
    let imageUrl = request.imageUrl;

    if(image == null || title == null) {
        alert("Unable to find the necessary details on this page")
    } else {
        let formData = new FormData();
        formData.append('text', title);
        formData.append('imageurl', imageUrl);
        formData.append('filename',  '1 image.jpg');

        const rawResponse = await fetch('http://ibfprod.us-west-2.elasticbeanstalk.com/findrelativeimages', {
            method: 'POST',
            body: formData
        });
        const response = await rawResponse.json();
        var responseData = [];
        for (var i = 0; i < response.length; i++) {
            const product = response[i];
            const label = product['Label'];
            const originalName = product['OriginalName'];
            var photoUrl = "https://ibfweb.s3.us-east-2.amazonaws.com/DatasetColorOnly/" + label + "/" + originalName;
            responseData.push(
                '<div class="card">',
                    '<div class="container-fliud">',
                        '<div class="wrapper row">',
                            '<div class="preview col-md-6">',
                                '<div class="preview-pic tab-content">',
                                    '<div class="tab-pane active" id="pic-1">',
                                        '<img src="' + photoUrl + '" />',
                                    '</div>',
                                    '<div class="tab-pane" id="pic-2">',
                                        '<img src="' + photoUrl + '" />',
                                    '</div>',
                                    '<div class="tab-pane" id="pic-3">',
                                        '<img src="' + photoUrl + '" />',
                                    '</div>',
                                    '<div class="tab-pane" id="pic-4">',
                                        '<img src="' + photoUrl + '" />',
                                    '</div>',
                                    '<div class="tab-pane" id="pic-5">',
                                        '<img src="' + photoUrl + '" />',
                                    '</div>',
                                '</div>',
                                '<ul class="preview-thumbnail nav nav-tabs">',
                                    '<li class="active">',
                                        '<a data-target="#pic-1" data-toggle="tab"',
                                            '><img src="' + photoUrl + '"',
                                        '/></a>',
                                    '</li>',
                                    '<li class="active">',
                                        '<a data-target="#pic-2" data-toggle="tab"',
                                            '><img src="' + photoUrl + '"',
                                        '/></a>',
                                    '</li>',
                                    '<li class="active">',
                                        '<a data-target="#pic-3" data-toggle="tab"',
                                            '><img src="' + photoUrl + '"',
                                        '/></a>',
                                    '</li>',
                                    '<li class="active">',
                                        '<a data-target="#pic-4" data-toggle="tab"',
                                            '><img src="' + photoUrl + '"',
                                        '/></a>',
                                    '</li>',
                                    '<li class="active">',
                                        '<a data-target="#pic-5" data-toggle="tab"',
                                            '><img src="' + photoUrl + '"',
                                        '/></a>',
                                    '</li>',
                                '</ul>',
                            '</div>',
                            '<div class="details col-md-6">',
                                '<h3 class="product-title">'+ product['Title'] + '</h3>',
                                '<div class="rating">',
                                    '<div class="stars">',
                                        '<span class="fa fa-star checked"></span>',
                                        '<span class="fa fa-star checked"></span>',
                                        '<span class="fa fa-star checked"></span>',
                                        '<span class="fa fa-star"></span>',
                                        '<span class="fa fa-star"></span>',
                                    '</div>',
                                    '<span class="review-no">41 reviews</span>',
                                '</div>',  
                            '</div>',
                            '<p class="product-description">',
                                'Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.',
                            '</p>',
                            '<h4 class="price">current price: <span>' + product["Price"] + '</span></h4>',
                            '<p class="vote">',
                                '<strong>91%</strong> of buyers enjoyed this product!',
                                '<strong>(87 votes)</strong>',
                            '</p>',
                            '<h5 class="sizes">',
                                'sizes:',
                                '<span class="size" data-toggle="tooltip" title="small">s</span>',
                                '<span class="size" data-toggle="tooltip" title="medium">m</span>',
                                '<span class="size" data-toggle="tooltip" title="large">l</span>',
                                '<span class="size" data-toggle="tooltip" title="xtra large">xl</span>',
                            '</h5>',
                            '<h5 class="colors">',
                                'colors:',
                                '<span',
                                    'class="color orange not-available"',
                                    'data-toggle="tooltip"',
                                    'title="Not In store"',
                                '></span>',
                                '<span class="color green"></span>',
                                '<span class="color blue"></span>',
                            '</h5>',
                            '<div class="action">',
                                '<button class="add-to-cart btn btn-default" type="button">',
                                    'add to cart',
                                '</button>',
                                '<button class="like btn btn-default" type="button">',
                                    '<span class="fa fa-heart"></span>',
                                '</button>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>'
            )
        }
        document.getElementById('products').innerHTML = getHtml(responseData);

        scrape.style.cssText = 'display:none !important';
        products.style.cssText = 'display:block !important';
    }
})

// Button's click event listener
scrapeAmazonData.addEventListener("click", async() => {
    // Get current active tab
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    // Execute script to parse emails onpage
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeAmazonImageData
    });
})

// Function to scrape product tilte and image url
function scrapeAmazonImageData() {
    const imageDataRegex = "<img alt=\".*\".*onload=\"markFeatureRenderForImageBlock.*\".*>";
    let image = document.body.innerHTML.match(imageDataRegex)[0];
    let title = image.match('(?<=alt=\")[^"]*(?=\")');
    let imageUrl = image.match('(?<=src=\")[^"]*(?=\")');
    chrome.runtime.sendMessage({image, title, imageUrl});
}