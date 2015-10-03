
/* Generated by Opal 0.7.2 */
Opal.modules["browser/http/binary"] = function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;

  Opal.add_stubs(['$attr_reader', '$===', '$to_a', '$include', '$enum_for', '$length', '$<', '$call', '$[]', '$+', '$==']);
  return (function($base) {
    var self = $module($base, 'Browser');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base) {
      var self = $module($base, 'HTTP');

      var def = self.$$proto, $scope = self.$$scope;

      (function($base, $super) {
        function $Binary(){};
        var self = $Binary = $klass($base, $super, 'Binary', $Binary);

        var def = self.$$proto, $scope = self.$$scope, TMP_1;

        def.type = def.data = nil;
        self.$attr_reader("type");

        def.$initialize = function(value) {
          var $a, self = this;

          if ((($a = $scope.get('String')['$==='](value)) !== nil && (!$a.$$is_boolean || $a == true))) {
            self.type = "string";
            return self.data = value;
            } else {
            self.type = "buffer";
            return self.data = value.$to_a();
          };
        };

        self.$include($scope.get('Enumerable'));

        def.$each = TMP_1 = function() {
          var $a, self = this, $iter = TMP_1.$$p, block = $iter || nil, index = nil, length = nil;

          TMP_1.$$p = null;
          if (block !== false && block !== nil) {
            } else {
            return self.$enum_for("each")
          };
          index = 0;
          length = self.$length();
          while (index['$<'](length)) {
          block.$call(self['$[]'](index));
          index = index['$+'](1);};
          return self;
        };

        def['$[]'] = function(index) {
          var self = this;

          if (self.type['$==']("string")) {
            return self.data.charCodeAt(index) & 0xff;
            } else {
            return self.data['$[]'](index)
          };
        };

        return (def.$length = function() {
          var self = this;

          return self.data.$length();
        }, nil) && 'length';
      })(self, null)
    })(self)
  })(self)
};

/* Generated by Opal 0.7.2 */
Opal.modules["browser/http/headers"] = function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;

  Opal.add_stubs(['$new', '$[]', '$map', '$split', '$chomp', '$lines', '$each', '$[]=', '$include', '$clear', '$enum_for', '$call', '$name', '$value', '$downcase', '$length']);
  return (function($base) {
    var self = $module($base, 'Browser');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base) {
      var self = $module($base, 'HTTP');

      var def = self.$$proto, $scope = self.$$scope;

      Opal.cdecl($scope, 'Header', $scope.get('Struct').$new("name", "value"));

      (function($base, $super) {
        function $Headers(){};
        var self = $Headers = $klass($base, $super, 'Headers', $Headers);

        var def = self.$$proto, $scope = self.$$scope, TMP_3;

        def.hash = nil;
        Opal.defs(self, '$parse', function(string) {
          var $a, $b, TMP_1, self = this;

          return self['$[]'](($a = ($b = string.$lines()).$map, $a.$$p = (TMP_1 = function(l){var self = TMP_1.$$s || this;
if (l == null) l = nil;
          return l.$chomp().$split(/\s*:\s*/)}, TMP_1.$$s = self, TMP_1), $a).call($b));
        });

        Opal.defs(self, '$[]', function(hash) {
          var $a, $b, TMP_2, self = this, result = nil;

          result = self.$new();
          ($a = ($b = hash).$each, $a.$$p = (TMP_2 = function(name, value){var self = TMP_2.$$s || this;
if (name == null) name = nil;if (value == null) value = nil;
          return result['$[]='](name, value)}, TMP_2.$$s = self, TMP_2), $a).call($b);
          return result;
        });

        self.$include($scope.get('Enumerable'));

        def.$initialize = function() {
          var self = this;

          return self.hash = $scope.get('Hash').$new();
        };

        def.$clear = function() {
          var self = this;

          return self.hash.$clear();
        };

        def.$each = TMP_3 = function() {
          var $a, $b, TMP_4, self = this, $iter = TMP_3.$$p, block = $iter || nil;

          TMP_3.$$p = null;
          if (block !== false && block !== nil) {
            } else {
            return self.$enum_for("each")
          };
          ($a = ($b = self.hash).$each, $a.$$p = (TMP_4 = function(_, header){var self = TMP_4.$$s || this;
if (_ == null) _ = nil;if (header == null) header = nil;
          return block.$call([header.$name(), header.$value()])}, TMP_4.$$s = self, TMP_4), $a).call($b);
          return self;
        };

        def['$[]'] = function(name) {
          var self = this;

          return self.hash['$[]'](name.$downcase());
        };

        def['$[]='] = function(name, value) {
          var self = this, header = nil;

          header = $scope.get('Header').$new(name, value);
          return self.hash['$[]='](name.$downcase(), header);
        };

        def['$<<'] = function(header) {
          var self = this;

          self.hash['$[]='](header.$name().$downcase(), header);
          return self;
        };

        Opal.defn(self, '$push', def['$<<']);

        def['$merge!'] = function(other) {
          var $a, $b, TMP_5, self = this;

          ($a = ($b = other).$each, $a.$$p = (TMP_5 = function(name, value){var self = TMP_5.$$s || this;
if (name == null) name = nil;if (value == null) value = nil;
          return self['$[]='](name, value)}, TMP_5.$$s = self, TMP_5), $a).call($b);
          return self;
        };

        return (def.$length = function() {
          var self = this;

          return self.hash.$length();
        }, nil) && 'length';
      })(self, null);
    })(self)
  })(self)
};

/* Generated by Opal 0.7.2 */
Opal.modules["browser/http/request"] = function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass, $hash2 = Opal.hash2;

  Opal.add_stubs(['$include', '$attr_reader', '$transport', '$[]', '$new', '$[]=', '$==', '$arity', '$instance_exec', '$to_proc', '$call', '$supports?', '$raise', '$!', '$<<', '$opened?', '$nil?', '$cacheable?', '$rand', '$empty?', '$include?', '$+', '$encode_uri', '$upcase', '$to_s', '$to_n', '$callback', '$sent?', '$each', '$binary?', '$supported?', '$mime_type', '$===', '$join', '$map', '$private', '$lambda', '$response', '$code', '$status', '$success?']);
  return (function($base) {
    var self = $module($base, 'Browser');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base) {
      var self = $module($base, 'HTTP');

      var def = self.$$proto, $scope = self.$$scope;

      (function($base, $super) {
        function $Request(){};
        var self = $Request = $klass($base, $super, 'Request', $Request);

        var def = self.$$proto, $scope = self.$$scope, TMP_1, $a, TMP_3;

        def.opened = def.sent = def.completed = def.asynchronous = def.binary = def.cacheable = def.user = def.password = def.mime_type = def.content_type = def.encoding = def.parameters = def.query = def.callbacks = def.url = def["native"] = def.method = def.headers = def.response = nil;
        self.$include($scope.get('Native'));

        Opal.cdecl($scope, 'HEADERS', $hash2(["X-Requested-With", "X-Opal-Version", "Accept"], {"X-Requested-With": "XMLHttpRequest", "X-Opal-Version": $scope.get('RUBY_ENGINE_VERSION'), "Accept": "text/javascript, text/html, application/xml, text/xml, */*"}));

        self.$attr_reader("headers");

        self.$attr_reader("response");

        self.$attr_reader("method");

        self.$attr_reader("url");

        def.$initialize = TMP_1 = function() {
          var $a, $b, TMP_2, $c, self = this, $iter = TMP_1.$$p, block = $iter || nil;

          TMP_1.$$p = null;
          Opal.find_super_dispatcher(self, 'initialize', TMP_1, null).apply(self, [self.$transport()]);
          self.parameters = $hash2([], {});
          self.query = $hash2([], {});
          self.headers = $scope.get('Headers')['$[]']($scope.get('HEADERS'));
          self.method = "get";
          self.asynchronous = true;
          self.binary = false;
          self.cacheable = true;
          self.opened = false;
          self.sent = false;
          self.completed = false;
          self.callbacks = ($a = ($b = $scope.get('Hash')).$new, $a.$$p = (TMP_2 = function(h, k){var self = TMP_2.$$s || this;
if (h == null) h = nil;if (k == null) k = nil;
          return h['$[]='](k, [])}, TMP_2.$$s = self, TMP_2), $a).call($b);
          if (block !== false && block !== nil) {
            if (block.$arity()['$=='](0)) {
              return ($a = ($c = self).$instance_exec, $a.$$p = block.$to_proc(), $a).call($c)
              } else {
              return block.$call(self)
            }
            } else {
            return nil
          };
        };

        if ((($a = $scope.get('Browser')['$supports?']("XHR")) !== nil && (!$a.$$is_boolean || $a == true))) {
          def.$transport = function() {
            var self = this;

            return new XMLHttpRequest();
          }
        } else if ((($a = $scope.get('Browser')['$supports?']("ActiveX")) !== nil && (!$a.$$is_boolean || $a == true))) {
          def.$transport = function() {
            var self = this;

            return new ActiveXObject("MSXML2.XMLHTTP.3.0");
          }
          } else {
          def.$transport = function() {
            var self = this;

            return self.$raise($scope.get('NotImplementedError'));
          }
        };

        def['$opened?'] = function() {
          var self = this;

          return self.opened;
        };

        def['$sent?'] = function() {
          var self = this;

          return self.sent;
        };

        def['$completed?'] = function() {
          var self = this;

          return self.completed;
        };

        def['$asynchronous?'] = function() {
          var self = this;

          return self.asynchronous;
        };

        def['$synchronous?'] = function() {
          var self = this;

          return self.asynchronous['$!']();
        };

        def['$asynchronous!'] = function() {
          var self = this;

          return self.asynchronous = true;
        };

        def['$synchronous!'] = function() {
          var self = this;

          return self.asynchronous = false;
        };

        def['$binary?'] = function() {
          var self = this;

          return self.binary;
        };

        def['$binary!'] = function() {
          var self = this;

          return self.binary = true;
        };

        def['$cacheable?'] = function() {
          var self = this;

          return self.cacheable;
        };

        def['$no_cache!'] = function() {
          var self = this;

          return self.cacheable = false;
        };

        def.$user = function(value) {
          var self = this;

          if (value == null) {
            value = nil
          }
          if (value !== false && value !== nil) {
            return self.user = value
            } else {
            return self.user
          };
        };

        def.$password = function(value) {
          var self = this;

          if (value == null) {
            value = nil
          }
          if (value !== false && value !== nil) {
            return self.password = value
            } else {
            return self.password
          };
        };

        def.$mime_type = function(value) {
          var self = this;

          if (value == null) {
            value = nil
          }
          if (value !== false && value !== nil) {
            return self.mime_type = value
            } else {
            return self.mime_type
          };
        };

        def.$content_type = function(value) {
          var self = this;

          if (value == null) {
            value = nil
          }
          if (value !== false && value !== nil) {
            return self.content_type = value
            } else {
            return self.content_type
          };
        };

        def.$encoding = function(value) {
          var self = this;

          if (value == null) {
            value = nil
          }
          if (value !== false && value !== nil) {
            return self.encoding = value
            } else {
            return self.encoding
          };
        };

        def.$parameters = function(hash) {
          var self = this;

          if (hash == null) {
            hash = nil
          }
          if (hash !== false && hash !== nil) {
            return self.parameters = hash
            } else {
            return self.parameters
          };
        };

        def.$query = function(hash) {
          var self = this;

          if (hash == null) {
            hash = nil
          }
          if (hash !== false && hash !== nil) {
            return self.query = hash
            } else {
            return self.query
          };
        };

        def.$on = TMP_3 = function(what) {
          var self = this, $iter = TMP_3.$$p, block = $iter || nil;

          TMP_3.$$p = null;
          return self.callbacks['$[]'](what)['$<<'](block);
        };

        def.$open = function(method, url, asynchronous, user, password) {
          var $a, self = this;

          if (method == null) {
            method = nil
          }
          if (url == null) {
            url = nil
          }
          if (asynchronous == null) {
            asynchronous = nil
          }
          if (user == null) {
            user = nil
          }
          if (password == null) {
            password = nil
          }
          if ((($a = self['$opened?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            self.$raise("the request has already been opened")};
          if ((($a = method['$nil?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self.method = method
          };
          if ((($a = url['$nil?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self.url = url
          };
          if ((($a = asynchronous['$nil?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self.asynchronous = asynchronous
          };
          if ((($a = user['$nil?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self.user = user
          };
          if ((($a = password['$nil?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self.password = password
          };
          url = self.url;
          if ((($a = self['$cacheable?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self.query['$[]=']("_", self.$rand())
          };
          if ((($a = self.query['$empty?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            if ((($a = url['$include?']("?")) !== nil && (!$a.$$is_boolean || $a == true))) {
              url = url['$+']("&")
              } else {
              url = url['$+']("?")
            };
            url = url['$+'](self.query.$encode_uri());
          };
          self["native"].open(self.method.$to_s().$upcase(), url.$to_s(), self.asynchronous, self.user.$to_n(), self.password.$to_n());
          if ((($a = self.callbacks['$empty?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self["native"].onreadystatechange = self.$callback();
          };
          self.opened = true;
          return self;
        };

        def.$send = function(parameters) {
          var $a, $b, TMP_4, $c, TMP_5, self = this, header = nil, data = nil;

          if (parameters == null) {
            parameters = self.parameters
          }
          if ((($a = self['$opened?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self.$raise("the request has not been opened")
          };
          if ((($a = self['$sent?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            self.$raise("the request has already been sent")};
          if ((($a = self['$cacheable?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            self["native"].setRequestHeader("If-Modified-Since", "Tue, 11 Sep 2001 12:46:00 GMT");
          };
          ($a = ($b = self.headers).$each, $a.$$p = (TMP_4 = function(name, value){var self = TMP_4.$$s || this;
            if (self["native"] == null) self["native"] = nil;
if (name == null) name = nil;if (value == null) value = nil;
          return self["native"].setRequestHeader(name.$to_s(), value.$to_s());}, TMP_4.$$s = self, TMP_4), $a).call($b);
          if ((($a = self.content_type) !== nil && (!$a.$$is_boolean || $a == true))) {
            header = self.content_type;
            if ((($a = self.encoding) !== nil && (!$a.$$is_boolean || $a == true))) {
              header = header['$+']("; charset=" + (self.encoding))};
            self["native"].setRequestHeader('Content-Type', header);};
          if ((($a = self['$binary?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            if ((($a = $scope.get('Buffer')['$supported?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
              self["native"].responseType = 'arraybuffer';
              } else {
              self["native"].overrideMimeType('text/plain; charset=x-user-defined');
            }};
          if ((($a = ($c = self.$mime_type(), $c !== false && $c !== nil ?self['$binary?']()['$!']() : $c)) !== nil && (!$a.$$is_boolean || $a == true))) {
            self["native"].overrideMimeType(self.mime_type);};
          self.sent = true;
          self.response = $scope.get('Response').$new(self);
          if ((($a = $scope.get('String')['$==='](parameters)) !== nil && (!$a.$$is_boolean || $a == true))) {
            data = parameters
          } else if ((($a = ($c = $scope.get('Hash')['$==='](parameters), $c !== false && $c !== nil ?parameters['$empty?']()['$!']() : $c)) !== nil && (!$a.$$is_boolean || $a == true))) {
            data = ($a = ($c = parameters).$map, $a.$$p = (TMP_5 = function(vals){var self = TMP_5.$$s || this, $a, $b;
if (vals == null) vals = nil;
            return ($a = ($b = vals).$map, $a.$$p = "encode_uri_component".$to_proc(), $a).call($b).$join("=")}, TMP_5.$$s = self, TMP_5), $a).call($c).$join("&");
            if ((($a = self.content_type) !== nil && (!$a.$$is_boolean || $a == true))) {
              } else {
              self["native"].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            };
            } else {
            data = null
          };
          self["native"].send(data);
          return self.response;
        };

        def.$abort = function() {
          var self = this;

          return self["native"].abort();
        };

        self.$private();

        return (def.$callback = function() {
          var $a, $b, TMP_6, self = this;

          return ($a = ($b = self).$lambda, $a.$$p = (TMP_6 = function(event){var self = TMP_6.$$s || this, $a, $b, TMP_7, $c, TMP_8, $d, TMP_9, $e, TMP_10, state = nil, res = nil;
            if (self["native"] == null) self["native"] = nil;
            if (self.callbacks == null) self.callbacks = nil;
if (event == null) event = nil;
          state = ["uninitialized", "loading", "loaded", "interactive", "complete"]['$[]'](self["native"].readyState);
            res = self.$response();
            ($a = ($b = self.callbacks['$[]'](state)).$each, $a.$$p = (TMP_7 = function(b){var self = TMP_7.$$s || this;
if (b == null) b = nil;
            return b.$call(res)}, TMP_7.$$s = self, TMP_7), $a).call($b);
            if (state['$==']("complete")) {
              self.completed = true;
              ($a = ($c = self.callbacks['$[]'](res.$status().$code())).$each, $a.$$p = (TMP_8 = function(b){var self = TMP_8.$$s || this;
if (b == null) b = nil;
              return b.$call(res)}, TMP_8.$$s = self, TMP_8), $a).call($c);
              if ((($a = res['$success?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
                return ($a = ($d = self.callbacks['$[]']("success")).$each, $a.$$p = (TMP_9 = function(b){var self = TMP_9.$$s || this;
if (b == null) b = nil;
                return b.$call(res)}, TMP_9.$$s = self, TMP_9), $a).call($d)
                } else {
                return ($a = ($e = self.callbacks['$[]']("failure")).$each, $a.$$p = (TMP_10 = function(b){var self = TMP_10.$$s || this;
if (b == null) b = nil;
                return b.$call(res)}, TMP_10.$$s = self, TMP_10), $a).call($e)
              };
              } else {
              return nil
            };}, TMP_6.$$s = self, TMP_6), $a).call($b);
        }, nil) && 'callback';
      })(self, null)
    })(self)
  })(self)
};

/* Generated by Opal 0.7.2 */
Opal.modules["json"] = function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $hash2 = Opal.hash2, $klass = Opal.klass;

  Opal.add_stubs(['$new', '$push', '$[]=', '$[]', '$create_id', '$json_create', '$attr_accessor', '$create_id=', '$===', '$parse', '$generate', '$from_object', '$to_json', '$responds_to?', '$to_io', '$write', '$to_s', '$to_a', '$strftime']);
  (function($base) {
    var self = $module($base, 'JSON');

    var def = self.$$proto, $scope = self.$$scope, $a, $b;


    var $parse  = JSON.parse,
        $hasOwn = Opal.hasOwnProperty;

    function to_opal(value, options) {
      switch (typeof value) {
        case 'string':
          return value;

        case 'number':
          return value;

        case 'boolean':
          return !!value;

        case 'null':
          return nil;

        case 'object':
          if (!value) return nil;

          if (value.$$is_array) {
            var arr = (options.array_class).$new();

            for (var i = 0, ii = value.length; i < ii; i++) {
              (arr).$push(to_opal(value[i], options));
            }

            return arr;
          }
          else {
            var hash = (options.object_class).$new();

            for (var k in value) {
              if ($hasOwn.call(value, k)) {
                (hash)['$[]='](k, to_opal(value[k], options));
              }
            }

            var klass;
            if ((klass = (hash)['$[]']($scope.get('JSON').$create_id())) != nil) {
              klass = Opal.cget(klass);
              return (klass).$json_create(hash);
            }
            else {
              return hash;
            }
          }
      }
    };


    (function(self) {
      var $scope = self.$$scope, def = self.$$proto;

      return self.$attr_accessor("create_id")
    })(self.$singleton_class());

    (($a = ["json_class"]), $b = self, $b['$create_id='].apply($b, $a), $a[$a.length-1]);

    Opal.defs(self, '$[]', function(value, options) {
      var $a, self = this;

      if (options == null) {
        options = $hash2([], {})
      }
      if ((($a = $scope.get('String')['$==='](value)) !== nil && (!$a.$$is_boolean || $a == true))) {
        return self.$parse(value, options)
        } else {
        return self.$generate(value, options)
      };
    });

    Opal.defs(self, '$parse', function(source, options) {
      var self = this;

      if (options == null) {
        options = $hash2([], {})
      }
      return self.$from_object($parse(source), options);
    });

    Opal.defs(self, '$parse!', function(source, options) {
      var self = this;

      if (options == null) {
        options = $hash2([], {})
      }
      return self.$parse(source, options);
    });

    Opal.defs(self, '$from_object', function(js_object, options) {
      var $a, $b, $c, self = this;

      if (options == null) {
        options = $hash2([], {})
      }
      ($a = "object_class", $b = options, ((($c = $b['$[]']($a)) !== false && $c !== nil) ? $c : $b['$[]=']($a, $scope.get('Hash'))));
      ($a = "array_class", $b = options, ((($c = $b['$[]']($a)) !== false && $c !== nil) ? $c : $b['$[]=']($a, $scope.get('Array'))));
      return to_opal(js_object, options.smap);
    });

    Opal.defs(self, '$generate', function(obj, options) {
      var self = this;

      if (options == null) {
        options = $hash2([], {})
      }
      return obj.$to_json(options);
    });

    Opal.defs(self, '$dump', function(obj, io, limit) {
      var $a, self = this, string = nil;

      if (io == null) {
        io = nil
      }
      if (limit == null) {
        limit = nil
      }
      string = self.$generate(obj);
      if (io !== false && io !== nil) {
        if ((($a = io['$responds_to?']("to_io")) !== nil && (!$a.$$is_boolean || $a == true))) {
          io = io.$to_io()};
        io.$write(string);
        return io;
        } else {
        return string
      };
    });
  })(self);
  (function($base, $super) {
    function $Object(){};
    var self = $Object = $klass($base, $super, 'Object', $Object);

    var def = self.$$proto, $scope = self.$$scope;

    return (Opal.defn(self, '$to_json', function() {
      var self = this;

      return self.$to_s().$to_json();
    }), nil) && 'to_json'
  })(self, null);
  (function($base) {
    var self = $module($base, 'Enumerable');

    var def = self.$$proto, $scope = self.$$scope;

    Opal.defn(self, '$to_json', function() {
      var self = this;

      return self.$to_a().$to_json();
    })
  })(self);
  (function($base, $super) {
    function $Array(){};
    var self = $Array = $klass($base, $super, 'Array', $Array);

    var def = self.$$proto, $scope = self.$$scope;

    return (def.$to_json = function() {
      var self = this;


      var result = [];

      for (var i = 0, length = self.length; i < length; i++) {
        result.push((self[i]).$to_json());
      }

      return '[' + result.join(', ') + ']';

    }, nil) && 'to_json'
  })(self, null);
  (function($base, $super) {
    function $Boolean(){};
    var self = $Boolean = $klass($base, $super, 'Boolean', $Boolean);

    var def = self.$$proto, $scope = self.$$scope;

    return (def.$to_json = function() {
      var self = this;

      return (self == true) ? 'true' : 'false';
    }, nil) && 'to_json'
  })(self, null);
  (function($base, $super) {
    function $Hash(){};
    var self = $Hash = $klass($base, $super, 'Hash', $Hash);

    var def = self.$$proto, $scope = self.$$scope;

    return (def.$to_json = function() {
      var self = this;


      var inspect = [],
          keys = self.keys,
          _map = self.map,
          smap = self.smap,
          map, khash;

      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];

        if (key.$$is_string) {
          map = smap;
          khash = key;
        } else {
          map = _map;
          khash = key.$hash();
        }

        inspect.push((key).$to_s().$to_json() + ':' + (map[khash]).$to_json());
      }

      return '{' + inspect.join(', ') + '}';
    ;
    }, nil) && 'to_json'
  })(self, null);
  (function($base, $super) {
    function $NilClass(){};
    var self = $NilClass = $klass($base, $super, 'NilClass', $NilClass);

    var def = self.$$proto, $scope = self.$$scope;

    return (def.$to_json = function() {
      var self = this;

      return "null";
    }, nil) && 'to_json'
  })(self, null);
  (function($base, $super) {
    function $Numeric(){};
    var self = $Numeric = $klass($base, $super, 'Numeric', $Numeric);

    var def = self.$$proto, $scope = self.$$scope;

    return (def.$to_json = function() {
      var self = this;

      return self.toString();
    }, nil) && 'to_json'
  })(self, null);
  (function($base, $super) {
    function $String(){};
    var self = $String = $klass($base, $super, 'String', $String);

    var def = self.$$proto, $scope = self.$$scope;

    return Opal.defn(self, '$to_json', def.$inspect)
  })(self, null);
  (function($base, $super) {
    function $Time(){};
    var self = $Time = $klass($base, $super, 'Time', $Time);

    var def = self.$$proto, $scope = self.$$scope;

    return (def.$to_json = function() {
      var self = this;

      return self.$strftime("%FT%T%z").$to_json();
    }, nil) && 'to_json'
  })(self, null);
  return (function($base, $super) {
    function $Date(){};
    var self = $Date = $klass($base, $super, 'Date', $Date);

    var def = self.$$proto, $scope = self.$$scope;

    def.$to_json = function() {
      var self = this;

      return self.$to_s().$to_json();
    };

    return (def.$as_json = function() {
      var self = this;

      return self.$to_s();
    }, nil) && 'as_json';
  })(self, null);
};

/* Generated by Opal 0.7.2 */
Opal.modules["browser/http/response"] = function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module, $klass = Opal.klass;

  Opal.add_stubs(['$require', '$include', '$new', '$attr_reader', '$to_n', '$parse', '$code', '$status', '$>=', '$<', '$==', '$!', '$success?', '$DOM', '$binary?', '$request', '$supported?', '$text']);
  self.$require("json");
  return (function($base) {
    var self = $module($base, 'Browser');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base) {
      var self = $module($base, 'HTTP');

      var def = self.$$proto, $scope = self.$$scope;

      (function($base, $super) {
        function $Response(){};
        var self = $Response = $klass($base, $super, 'Response', $Response);

        var def = self.$$proto, $scope = self.$$scope, TMP_1;

        def.headers = def["native"] = nil;
        self.$include($scope.get('Native'));

        Opal.cdecl($scope, 'Status', $scope.get('Struct').$new("code", "text"));

        self.$attr_reader("request");

        def.$initialize = TMP_1 = function(request) {
          var self = this, $iter = TMP_1.$$p, $yield = $iter || nil;

          TMP_1.$$p = null;
          Opal.find_super_dispatcher(self, 'initialize', TMP_1, null).apply(self, [request.$to_n()]);
          return self.request = request;
        };

        def.$headers = function() {
          var $a, self = this;

          return ((($a = self.headers) !== false && $a !== nil) ? $a : self.headers = $scope.get('Headers').$parse(self["native"].getAllResponseHeaders()));
        };

        def.$status = function() {
          var self = this;

          return $scope.get('Status').$new(self["native"].status || nil, self["native"].statusText || nil);
        };

        def['$success?'] = function() {
          var $a, $b, self = this, code = nil;

          if ((($a = code = self.$status().$code()) !== nil && (!$a.$$is_boolean || $a == true))) {
            return ((($a = (($b = code['$>='](200)) ? code['$<'](300) : $b)) !== false && $a !== nil) ? $a : code['$=='](304))
            } else {
            return false
          };
        };

        def['$failure?'] = function() {
          var self = this;

          return self['$success?']()['$!']();
        };

        def.$text = function() {
          var self = this;


      var result = self["native"].responseText;

      if (!result) {
        return nil;
      }

      return result;
    ;
        };

        def.$json = function() {
          var self = this;


      var result = self["native"].responseText;

      if (!result) {
        return nil;
      }

      return $scope.get('JSON').$parse(result);
    ;
        };

        def.$xml = function() {
          var self = this;


      var result = self["native"].responseXML;

      if (!result) {
        return nil;
      }
    ;
          return self.$DOM(result);
        };

        return (def.$binary = function() {
          var $a, self = this;

          if ((($a = self.$request()['$binary?']()) !== nil && (!$a.$$is_boolean || $a == true))) {
            } else {
            return nil
          };
          if ((($a = $scope.get('Buffer')['$supported?']()) !== nil && (!$a.$$is_boolean || $a == true))) {

        var result = self["native"].response;

        if (!result) {
          return nil;
        }
      ;
            return $scope.get('Binary').$new($scope.get('Buffer').$new(result));
            } else {
            if ((($a = self.$text()) !== nil && (!$a.$$is_boolean || $a == true))) {
              } else {
              return nil
            };
            return $scope.get('Binary').$new(self.$text());
          };
        }, nil) && 'binary';
      })(self, null)
    })(self)
  })(self);
};

/* Generated by Opal 0.7.2 */
Opal.modules["browser/http"] = function(Opal) {
  Opal.dynamic_require_severity = "error";
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $module = Opal.module;

  Opal.add_stubs(['$require', '$supports?', '$tap', '$send', '$open', '$on', '$resolve', '$reject', '$new', '$to_proc', '$send!']);
  self.$require("promise");
  self.$require("browser/http/binary");
  self.$require("browser/http/headers");
  self.$require("browser/http/request");
  self.$require("browser/http/response");
  return (function($base) {
    var self = $module($base, 'Browser');

    var def = self.$$proto, $scope = self.$$scope;

    (function($base) {
      var self = $module($base, 'HTTP');

      var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_6, TMP_7, TMP_8, TMP_9, TMP_10, TMP_11, TMP_12, TMP_13, TMP_14, TMP_15, TMP_16;

      Opal.defs(self, '$supported?', function() {
        var $a, self = this;

        return ((($a = $scope.get('Browser')['$supports?']("XHR")) !== false && $a !== nil) ? $a : $scope.get('Browser')['$supports?']("ActiveXObject"));
      });

      Opal.defs(self, '$send', TMP_1 = function(method, url, data) {
        var $a, $b, TMP_2, self = this, $iter = TMP_1.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_1.$$p = null;
        return ($a = ($b = $scope.get('Promise').$new()).$tap, $a.$$p = (TMP_2 = function(promise){var self = TMP_2.$$s || this, $a, $b, TMP_3, $c, $d;
if (promise == null) promise = nil;
        return ($a = ($b = ($c = ($d = $scope.get('Request')).$new, $c.$$p = block.$to_proc(), $c).call($d)).$tap, $a.$$p = (TMP_3 = function(req){var self = TMP_3.$$s || this, $a, $b, TMP_4, $c, TMP_5;
if (req == null) req = nil;
          ($a = ($b = req).$on, $a.$$p = (TMP_4 = function(res){var self = TMP_4.$$s || this;
if (res == null) res = nil;
            return promise.$resolve(res)}, TMP_4.$$s = self, TMP_4), $a).call($b, "success");
            return ($a = ($c = req).$on, $a.$$p = (TMP_5 = function(res){var self = TMP_5.$$s || this;
if (res == null) res = nil;
            return promise.$reject(res)}, TMP_5.$$s = self, TMP_5), $a).call($c, "failure");}, TMP_3.$$s = self, TMP_3), $a).call($b).$open(method, url).$send(data)}, TMP_2.$$s = self, TMP_2), $a).call($b);
      });

      Opal.defs(self, '$get', TMP_6 = function(url) {
        var $a, $b, self = this, $iter = TMP_6.$$p, block = $iter || nil;

        TMP_6.$$p = null;
        return ($a = ($b = self).$send, $a.$$p = block.$to_proc(), $a).call($b, "get", url);
      });

      Opal.defs(self, '$head', TMP_7 = function(url) {
        var $a, $b, self = this, $iter = TMP_7.$$p, block = $iter || nil;

        TMP_7.$$p = null;
        return ($a = ($b = self).$send, $a.$$p = block.$to_proc(), $a).call($b, "head", url);
      });

      Opal.defs(self, '$post', TMP_8 = function(url, data) {
        var $a, $b, self = this, $iter = TMP_8.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_8.$$p = null;
        return ($a = ($b = self).$send, $a.$$p = block.$to_proc(), $a).call($b, "post", url, data);
      });

      Opal.defs(self, '$put', TMP_9 = function(url, data) {
        var $a, $b, self = this, $iter = TMP_9.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_9.$$p = null;
        return ($a = ($b = self).$send, $a.$$p = block.$to_proc(), $a).call($b, "put", url, data);
      });

      Opal.defs(self, '$delete', TMP_10 = function(url, data) {
        var $a, $b, self = this, $iter = TMP_10.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_10.$$p = null;
        return ($a = ($b = self).$send, $a.$$p = block.$to_proc(), $a).call($b, "delete", url, data);
      });

      Opal.defs(self, '$send!', TMP_11 = function(method, url, data) {
        var $a, $b, self = this, $iter = TMP_11.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_11.$$p = null;
        return ($a = ($b = $scope.get('Request')).$new, $a.$$p = block.$to_proc(), $a).call($b).$open(method, url, false).$send(data);
      });

      Opal.defs(self, '$get!', TMP_12 = function(url) {
        var $a, $b, self = this, $iter = TMP_12.$$p, block = $iter || nil;

        TMP_12.$$p = null;
        return ($a = ($b = self)['$send!'], $a.$$p = block.$to_proc(), $a).call($b, "get", url);
      });

      Opal.defs(self, '$head!', TMP_13 = function(url) {
        var $a, $b, self = this, $iter = TMP_13.$$p, block = $iter || nil;

        TMP_13.$$p = null;
        return ($a = ($b = self)['$send!'], $a.$$p = block.$to_proc(), $a).call($b, "head", url);
      });

      Opal.defs(self, '$post!', TMP_14 = function(url, data) {
        var $a, $b, self = this, $iter = TMP_14.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_14.$$p = null;
        return ($a = ($b = self)['$send!'], $a.$$p = block.$to_proc(), $a).call($b, "post", url, data);
      });

      Opal.defs(self, '$put!', TMP_15 = function(url, data) {
        var $a, $b, self = this, $iter = TMP_15.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_15.$$p = null;
        return ($a = ($b = self)['$send!'], $a.$$p = block.$to_proc(), $a).call($b, "put", url, data);
      });

      Opal.defs(self, '$delete!', TMP_16 = function(url, data) {
        var $a, $b, self = this, $iter = TMP_16.$$p, block = $iter || nil;

        if (data == null) {
          data = nil
        }
        TMP_16.$$p = null;
        return ($a = ($b = self)['$send!'], $a.$$p = block.$to_proc(), $a).call($b, "delete", url, data);
      });
    })(self)
  })(self);
};
