douchebagapp
============

douche bag app


<VirtualHost *:80>
	ServerAdmin webmaster@api.douchebag.dev 
	ServerName api.douchebag.dev    
	ServerAlias api.douchebag.dev
	DocumentRoot /Users/juanjdlt/Sites/apps/douchebag/rest_server/public
    ErrorLog "/private/var/log/apache2/api.douchebag.dev-error_log"
    CustomLog "/private/var/log/apache2/api.douchebag.dev-access_log" common
		<Directory "/Users/juanjdlt/Sites/apps/douchebag/rest_server/public">
			Options Indexes FollowSymLinks
			AllowOverride All
			Order allow,deny
			Allow from all
			</Directory>
</VirtualHost>

<VirtualHost *:80>
	ServerAdmin webmaster@douchebag.dev 
	ServerName www.douchebag.dev
	ServerAlias www.douchebag.dev        
	DocumentRoot /Users/juanjdlt/Sites/apps/douchebag/web_app
    ErrorLog "/private/var/log/apache2/douchebag.dev-error_log"
    CustomLog "/private/var/log/apache2/douchebag.dev-access_log" common
		<Directory "/Users/juanjdlt/Sites/apps/douchebag/web_app">
			Options Indexes FollowSymLinks
			AllowOverride All
			Order allow,deny
			Allow from all
		</Directory>
</VirtualHost>