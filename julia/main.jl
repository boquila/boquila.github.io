struct HTML
    path::String
    description::String
    image::String
    lang::String

    function HTML(path::String, description::String, image::String, lang::String)
        # Validate path
        endswith(path, ".html") || throw(ArgumentError("path must end with .html"))

        # Validate lang
        length(lang) == 2 || throw(ArgumentError("lang must be a 2-character string"))

        # Validate image
        (endswith(image, ".jpg") || endswith(image, ".png")) || 
        throw(ArgumentError("image must end with .jpg or .png"))

        new(path, description, image, lang)
    end
end

desc = Dict("es" => "Fundación boquila es una organización dedicada a la investigación aplicada, la conservación de la biodiversidad y el desarrollo sustentable. Utilizamos herramientas basadas en inteligencia artificial como nuestra base. Trabajamos para encontrar soluciones innovadoras que aborden los desafíos ambientales y sociales de nuestra época.", "en" => "Boquila Foundation is a non profit dedicated to applied research, the conservation of biodivesrity and sustainable development. We use artificial intelligence-based tools as our basis. We work to find innovative solutions that address the environmental and social challenges of our time.")
img = "https://boquila.org/assets/img/logo.png"
b = Dict("es" => ["verso.html","index.html", "donar.html"],"en" => ["verse.html","donate.html","hub.html"])

langs = ["es","en"]

lang = langs[1]
[
    HTML("verso.html",desc[lang],img, lang)
    HTML("index.html",desc[lang],img, lang)
    HTML("donar.html",desc[lang],img, lang)
]

lang = langs[2]
[
    HTML("verse.html",desc[lang],img,lang)
    HTML("donate.html",desc[lang],img,lang)
    HTML("hub.html",desc[lang],img,lang)
]

body(str) = "<body>"*str*"</body>"

function extract_main_content(html::String)
    pattern = r"<main[^>]*>(.*?)</main>"s  # 's' allows '.' to match newline
    m = match(Regex(pattern), html)
    return m !== nothing ? m.captures[1] : ""
end

function generate(data::HTML)
    footer = read("html/"*data.lang*"/footer.html")
    head = read("html/"*data.lang*"/head.html")
    header = read("html/"*data.lang*"/header.html")

    main = extract_main_content(read(data.path,String))
    
    a = """
    <!DOCTYPE html>
    <html lang="$data.lang">
    """

    final_str = a*head*body(header*main*footer)*"</html>"

    return final_str
end

function save(data::HTML)
    str = generate(data)

    open(data.path, "a") do io
        write(io, str);    
    end
end


save(HTML("verse.html",desc[lang],img,lang))
