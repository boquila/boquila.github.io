struct html
    path::String
    layer::Int
    lang::String
    description::String
    image::String

    function html(path::String, layer::Int, lang::String, description::String, image::String)
        # Validate path
        endswith(path, ".html") || throw(ArgumentError("path must end with .html"))

        # Validate lang
        length(lang) == 2 || throw(ArgumentError("lang must be a 2-character string"))

        # Validate image
        (endswith(image, ".jpg") || endswith(image, ".png")) || 
        throw(ArgumentError("image must end with .jpg or .png"))

        new(path, layer, lang, description, image)
    end
end

desc = Dict("es" => "Fundación boquila es una organización dedicada a la investigación aplicada, la conservación de la biodiversidad y el desarrollo sustentable. Utilizamos herramientas basadas en inteligencia artificial como nuestra base. Trabajamos para encontrar soluciones innovadoras que aborden los desafíos ambientales y sociales de nuestra época.", "en" => "Boquila Foundation is a non profit dedicated to applied research, the conservation of biodivesrity and sustainable development. We use artificial intelligence-based tools as our basis. We work to find innovative solutions that address the environmental and social challenges of our time.")
img = "https://boquila.org/assets/img/logo.png"
b = Dict("es" => ["verso.html","index.html", "donar.html"],"en" => ["en.html","verse.html","donate.html","hub.html"])

langs = ["es","en"]

lang = langs[1]
[
    html("verso.html",0,lang,desc[lang],img)
    html("index.html",0,lang,desc[lang],img)
    html("donar.html",0,lang,desc[lang],img)
]

lang = langs[2]
[
    html("verso.html",0,lang,desc[lang],img)
    html("index.html",0,lang,desc[lang],img)
    html("donar.html",0,lang,desc[lang],img)
]

