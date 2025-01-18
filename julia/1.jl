using CSV,DataFrames,Unicode
minify_html(html::String)::String = replace(replace(html, r"\s+" => " "), r">\s+<" => "><")
addion(str::String)::String = replace(str, " " => "-")
remove_dots(str::String)::String = replace(str, r"[.,;!?\s]" => "")
name_html(str::String)::String = Unicode.normalize(str |> addion |> remove_dots |> lowercase |> Unicode.normalize,stripmark=true)*".html"

fields =  [
    ("html/template-verso.html","es","verso")
    ("html/template-verse.html","en","verse")
]

## Write to individual HTMLs
for field in fields 
    objects = CSV.read("julia/"*field[2]*".csv",DataFrame, delim = ";")
    for i in 1:nrow(objects)
        data = read(field[1],String)
        data = replace(data,"TITLE_PLACEHOLDER" => objects[i,1])
        data = replace(data,"URL_PLACEHOLDER" => objects[i,2])
        # data = data |> minify_html
        html_name = name_html(objects[i,1])
        output_path = field[3]*"/"*html_name
        open(output_path, "w") do file
            write(file, data)
        end
    end
end