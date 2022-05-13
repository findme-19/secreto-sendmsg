var axios = require("axios");
async function secretosendmsg(yuerel, meseg) {
	return new Promise(async (resolve, reject) => {
		if (!(url || url.match("secreto"))) return reject("input url yang valid")
		if (!meseg) return reject("input pesannya juga dong😅👆")
		var url = yuerel
		var a = await axios.request(url, {
			method: "GET",
			headers: {
				"user-agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
				accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
			}
		})

		var id = require("cheerio").load(a.data)("span#id").text()
		try {
			var send = await axios.request("https://api.secreto.site/sendmsg", {
				method: "POST",
				data: {
					id: id,
					message: meseg
				},
				headers: {
					"user-agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
					"content-type": "application/json",
					referer: url,
					Host: "api.secreto.site",
					origin: "https://secreto.site",
					accept: "*/*"
				}
			})
			resolve({
				status: 200,
				msg: "your message was successfully sending"
			})
		} catch (e) {
			if (e.response) {
				console.log(e.response.status)
				return reject("ada yang error dari situsnya nih kayaknya")
			} else {
				console.log(e)
				return reject("error di codingannya ini mah")
			}
		}
	})
}
async function getlistcomment(yuerel) {
	return new Promise(async (resolve, reject) => {
		try {
			var a = await axios.request(url, {
				method: "GET"
			})
			var data = []
			var anu = cheerio.load(a.data)
			anu(".message-child-block > .main-message-box").each(function(p, t) {
				var url_comment = anu(t).find(".message-flex > .message-title > p > a").attr('href')
				var text_comment = anu(t).find("h6.tenpxbottom").text()
				data.push({
					url_comment,
					text_comment
				});
			})
				let result = {
					msg: data.length + " comments",
					data
				}
			if (data.length == 0) result = {
				msg: data.length + " comments",
				data: null
			}
			resolve(result)
		} catch (e) {
			if (e.response) {
				return reject(false)
			} else {
				console.log(e)
				return reject(false)
			}
		}
	})
}