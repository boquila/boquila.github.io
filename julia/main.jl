struct HTML
    path::String
    description::String
    image::String
    title::String
    lang::String

    function HTML(path::String, description::String, image::String, title::String, lang::String)
        # Validate path
        endswith(path, ".html") || throw(ArgumentError("path must end with .html"))

        # Validate lang
        length(lang) == 2 || throw(ArgumentError("lang must be a 2-character string"))

        # Validate image
        (endswith(image, ".jpg") || endswith(image, ".png")) ||
            throw(ArgumentError("image must end with .jpg or .png"))

        new(path, description, image, title, lang)
    end
end

# Function to get link from dictionary with fallback to default pattern
function get_link(link_dict, lang)
    return haskey(link_dict, lang) ? link_dict[lang] : link_dict[:default](lang)
end

body(str::String)::String = "<body>\n" * str * "</body>\n"

function get_layer(data::HTML)::Int
    count(c -> c == '/', data.path)
end

function text_between(full_string::String, start_string::String, end_string::String)::String
    # Find the start position after the start_string
    start_pos = findnext(start_string, full_string, 1)
    if start_pos === nothing
        return ""  # Start string not found
    end

    # Calculate the position after the start_string
    start_idx = start_pos[end] + 1

    # Find the end position starting from after the start_string
    end_pos = findnext(end_string, full_string, start_idx)
    if end_pos === nothing
        return ""  # End string not found
    end

    return start_string * full_string[start_idx:end_pos[1]-1] * end_string
end

function generate(data::HTML)::String
    footer = read("html/footer.html", String) * "\n"
    head = read("html/head.html", String) * "\n"
    header = read("html/header.html", String) * "\n"
    main = text_between(read(data.path, String), "<main", "</main>") * "\n"

    a = """
    <!DOCTYPE html>
    <html lang="$(data.lang)">\n
    """

    final_str = a * head * body(header * main * footer) * "</html>"
    final_str = replace(final_str, "IMAGE_PLACEHOLDER" => data.image)
    final_str = replace(final_str, "TITLE_PLACEHOLDER" => data.title)
    final_str = replace(final_str, "DESCRIPTION_PLACEHOLDER" => data.description)
    final_str = replace(final_str, "FOOTER_PLACEHOLDER" => footer_text[data.lang])
    final_str = replace(final_str, "KEYWORDS_PLACEHOLDER" => keywords[data.lang])

    # header data
    final_str = replace(final_str, "MAIN_LINK" => get_link(main_links, data.lang))
    final_str = replace(final_str, "HUB_LINK" => get_link(hub_links, data.lang))
    final_str = replace(final_str, "VERSE_LINK" => get_link(verse_links, data.lang))
    final_str = replace(final_str, "DONATE_LINK" => get_link(donate_links, data.lang))

    final_str = replace(final_str, "BLOG_LINK" => "https://boquila.org/" * data.lang * "/blog")
    final_str = replace(final_str, "CURRENT_LANG" => uppercase(data.lang))

    layer::Int = get_layer(data)

    if layer > 0
        prefix = "../"^layer
        final_str = replace(final_str, "href=\"assets" => "href=\"" * prefix * "assets")
        final_str = replace(final_str, "href=\"js" => "href=\"" * prefix * "js")
        final_str = replace(final_str, "href=\"css" => "href=\"" * prefix * "css")
        final_str = replace(final_str, "src=\"assets" => "src=\"" * prefix * "assets")
        final_str = replace(final_str, "src=\"js" => "src=\"" * prefix * "js")
        final_str = replace(final_str, "src=\"css" => "src=\"" * prefix * "css")
    end

    return final_str
end

function save(data::HTML)
    str = generate(data)

    open(data.path, "w") do io
        write(io, str)
    end
end

# DEFAULTS
const keywords = Dict(
    "es" => "Inteligencia artificial, IA, biodiversidad, conservación, proyectos, Chile, innovación, tecnología, medio ambiente, sostenibilidad, cambio climático, ecología, protección de la naturaleza.",
    "en" => "Artificial intelligence, AI, biodiversity, conservation, projects, Chile, innovation, technology, environment, sustainability, climate change, ecology, nature protection.",
    "zh" => "人工智能, AI, 生物多样性, 保护, 项目, 智利, 创新, 技术, 环境, 可持续性, 气候变化, 生态学, 自然保护"
)

const desc = Dict(
    "es" => "Fundación boquila es una organización dedicada a la investigación aplicada, la conservación de la biodiversidad y el desarrollo sustentable. Utilizamos herramientas basadas en inteligencia artificial como nuestra base. Trabajamos para encontrar soluciones innovadoras que aborden los desafíos ambientales y sociales de nuestra época.",
    "en" => "Boquila Foundation is a non profit dedicated to applied research, the conservation of biodiversity and sustainable development. We use artificial intelligence-based tools as our basis. We work to find innovative solutions that address the environmental and social challenges of our time.",
    "zh" => "Boquila基金会是一家致力于应用研究、生物多样性保护和可持续发展的非营利组织。我们以人工智能技术为基础，寻找创新解决方案，以应对当今的环境和社会挑战。"
)

const title = Dict(
    "es" => "Fundación Boquila",
    "en" => "Boquila Foundation",
    "zh" => "Boquila基金会"
)

const footer_text = Dict(
    "es" => "Uniendo tecnología y naturaleza",
    "en" => "Connecting technology and nature.",
    "zh" => "科技与自然的联结"
)

const verse_text = Dict(
    "es" => "BoquilaVerso ofrece una colección abierta y creciente de modelos 3D creados con fotogrametría e inteligencia artificial. Ideal para la educación, el entrenamiento de IA y para conectar con la naturaleza a través de visualizaciones detalladas.",
    "en" => "BoquilaVerse offers a growing open collection of 3D models made with photogrammetry and deep learning. Ideal for education, AI training, and connecting with nature through detailed visualizations.",
    "zh" => "BoquilaVerse提供不断扩大的开放式3D模型库，所有模型均通过摄影测量和深度学习技术构建。特别适合教育、AI训练，以及通过高精度可视化实现与自然的深度交互。"
)

const donate_text = Dict(
    "es" => "Apoya a Boquila y sé parte de un movimiento global para proteger el planeta. Tu compromiso puede marcar la diferencia en la conservación de la biodiversidad y el desarrollo sustentable. ¡Dona ahora y únete al cambio!",
    "en" => "Support Boquila and become part of a global movement to protect the planet. Your commitment can make a difference in biodiversity conservation and sustainable development. Donate now and join the change!",
    "zh" => "支持Boquila，加入全球守护地球的行动。您的每一份投入都将推动生物多样性保护与可持续发展。立即捐赠，成为变革的力量！"
)

const hub_text = Dict(
    "es" => "BoquilaHUB empodera a los conservacionistas con IA desplegada localmente, ¡sin necesidad de nube! Disfruta de un rendimiento eficiente, una interfaz sencilla y análisis en tiempo real de imágenes y videos, incluso en dispositivos embebidos.",
    "en" => "BoquilaHUB empowers conservationists with locally deployed AI—no cloud needed. Enjoy efficient performance, simple UI, and real-time analysis of images and video, even on embedded devices.",
    "zh" => "BoquilaHUB为环保工作者提供本地化AI解决方案，无需依赖云端。即使在嵌入式设备上，也能实现高效的图像与视频实时分析，操作界面简洁，性能卓越。"
)

const hub_links = Dict(
    "en" => "https://boquila.org/hub",
    "zh" => "https://boquila.org/zh/zhongxin",
    :default => lang -> "https://boquila.org/$(lang)/hub"
)

const verse_links = Dict(
    "en" => "https://boquila.org/verse",
    "es" => "https://boquila.org/verso",
    "zh" => "https://boquila.org/zh/yuzhou",
    :default => lang -> "https://boquila.org/$(lang)/verse"
)

const donate_links = Dict(
    "en" => "https://boquila.org/donate",
    "es" => "https://boquila.org/donar",
    "zh" => "https://boquila.org/zh/juanzeng",
    :default => lang -> "https://boquila.org/$(lang)/donate"
)

const main_links = Dict(
    "es" => "https://boquila.org/",
    :default => lang -> "https://boquila.org/$(lang)"
)


const img = "https://boquila.org/assets/img/logo.png"

langs = ["es", "en", "zh"]

lang = langs[1]
es = [
    HTML("verso.html", verse_text[lang], img, "BoquilaVerso", lang)
    HTML("index.html", desc[lang], img, title[lang], lang)
    HTML("donar.html", donate_text[lang], img, "Apoya a Fundación Boquila", lang)
    HTML("es/hub.html", hub_text[lang], img, "BoquilaHUB", lang)
]

lang = langs[2]
en = [
    HTML("verse.html", verse_text[lang], img, "BoquilaVerse", lang)
    HTML("en/index.html", desc[lang], img, title[lang], lang)
    HTML("donate.html", donate_text[lang], img, "Support the Boquila Foundation", lang)
    HTML("hub.html", hub_text[lang], img, "BoquilaHUB", lang)
]

lang = langs[3]
zh = [
    HTML("zh/index.html", desc[lang], img, title[lang], lang)
    HTML("zh/juanzeng.html", donate_text[lang], img, title[lang], lang) # donate
    HTML("zh/yuzhou.html", verse_text[lang], img, title[lang], lang) # boquilaverse
    HTML("zh/zhongxin.html", hub_text[lang], img, title[lang], lang) # boquilahub
]

save.(es)
save.(en)
save.(zh)