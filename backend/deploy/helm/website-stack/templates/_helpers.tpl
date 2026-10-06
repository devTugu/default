{{- define "website-stack.fullname" -}}
{{- printf "%s-website" .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "website-stack.serviceAccountName" -}}
{{- printf "%s-sa" (include "website-stack.fullname" .) -}}
{{- end -}}
