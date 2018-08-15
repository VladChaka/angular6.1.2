let re = /(^[^\W\s_]+((?:\.|_|-)[^\W\s_]+)*)@(([a-zA-Z\d]+)\.([^\W\s\d_]{2,}))$/,
	re1 = /^[a-z0-9A-Z](?=.*[\d])(?=.*[a-z]).{4,16}$/,
	email = "allankar2010@mail.ru",
	pass = "vlad12345";
	
console.log(re.exec(email));
console.log(re1.exec(pass));